import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createStageLights } from './materials';

export type StageSize = { width: number; height: number };

export type StageFrame = {
  /** 从挂载起累计的秒数（暂停期间不累加） */
  elapsed: number;
  /** 上一帧的秒数差，已钳到 50ms 以内 */
  delta: number;
  /** 归一化指针位置，-1 ~ 1，画面外自动回到 0 */
  pointer: { x: number; y: number };
  /** 元素在视口里的滚动进度：0 = 刚进入底部，1 = 刚离开顶部 */
  progress: number;
  /** 当前页面滚动距离（px） */
  scrollY: number;
  size: StageSize;
};

export type StageHandles = {
  update?: (frame: StageFrame) => void;
  resize?: (size: StageSize, camera: THREE.PerspectiveCamera) => void;
  dispose?: () => void;
};

export type StageBuildContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  size: StageSize;
};

type StageOptions = {
  /** 相机垂直视角 */
  fov?: number;
  /** 相机视野要覆盖的世界尺寸（取宽高较小的一边），用来做自适应缩放 */
  fit?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * 新粗野主义 3D 舞台：负责 renderer / camera / 光照 / 尺寸 / 可见性 / 性能卫兵，
 * 场景内容由 build 回调自己组装。
 *
 * 性能约定（别删）：
 *  - 设备像素比上限 2，避免 4K 屏把 GPU 拖死
 *  - 元素离开视口或标签页隐藏时停掉 rAF
 *  - prefers-reduced-motion 时只渲染静态几帧
 *  - 卸载时逐个 dispose 几何体与材质
 */
export function useThreeStage(
  build: (context: StageBuildContext) => StageHandles | undefined,
  { fov = 36, fit = 5 }: StageOptions = {},
) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      // 不要写 'high-performance'：这站上有 7 个舞台，强制高性能会把独显一直叫醒，
      // 笔记本上反而容易掉帧、耗电。用 default，让浏览器自己选。
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
    } catch {
      host.dataset.webgl = 'unsupported';
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 这些舞台最大也就 190px 见方，2 倍 DPR 换不来画质，只换来 GPU 填充率
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = 'nb-3d-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(createStageLights());

    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const size: StageSize = { width: 1, height: 1 };
    let handles: StageHandles | undefined;

    const applySize = (width: number, height: number) => {
      size.width = Math.max(1, width);
      size.height = Math.max(1, height);
      renderer.setSize(size.width, size.height, false);

      camera.aspect = size.width / size.height;
      const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      // 让 min(可视宽, 可视高) 恒等于 fit，窄屏时物体不会溢出容器
      camera.position.z = fit / (2 * Math.tan(halfFov) * Math.min(1, camera.aspect));
      camera.updateProjectionMatrix();

      handles?.resize?.(size, camera);
    };

    handles = buildRef.current({ scene, camera, size });

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const pendingPointer = { x: 0, y: 0 };
    let progress = 0;
    let progressTarget = 0;
    let scrollY = 0;

    let running = false;
    let visible = false;

    /**
     * 缓存宿主矩形。getBoundingClientRect 会强制同步布局 —— 之前 7 个场景在
     * 每个 scroll / pointermove 里各读一次（每帧 7 次布局），是「越动越卡」的主因。
     */
    let hostRect = host.getBoundingClientRect();
    let rectDirty = false;

    const measure = () => {
      hostRect = host.getBoundingClientRect();
      rectDirty = false;
      const viewport = window.innerHeight || 1;
      scrollY = window.scrollY || 0;
      progressTarget = clamp((viewport - hostRect.top) / (viewport + hostRect.height), 0, 1);
    };

    /** 滚动合并成每帧一次；场景没在跑（离屏 / 标签页隐藏）时直接跳过 */
    let measureQueued = false;
    const queueMeasure = () => {
      rectDirty = true;
      if (measureQueued) return;
      measureQueued = true;
      requestAnimationFrame(() => {
        measureQueued = false;
        if (running) measure();
      });
    };

    /** 指针同样合并到每帧一次，且复用缓存的矩形，不再每帧重排 */
    let pointerQueued = false;
    const onPointerMove = (event: PointerEvent) => {
      if (!running) return;
      pendingPointer.x = event.clientX;
      pendingPointer.y = event.clientY;
      if (pointerQueued) return;
      pointerQueued = true;
      requestAnimationFrame(() => {
        pointerQueued = false;
        if (!running) return;
        if (rectDirty) measure();
        if (!hostRect.width || !hostRect.height) return;
        target.x = clamp(((pendingPointer.x - hostRect.left) / hostRect.width) * 2 - 1, -1, 1);
        target.y = clamp(((pendingPointer.y - hostRect.top) / hostRect.height) * 2 - 1, -1, 1);
      });
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      applySize(width, height);
      measure();
      // renderer.setSize 会清空画布：没有动画循环时（reduced-motion / 离屏）必须补一帧，
      // 否则用户看到的是一个空舞台
      if (!running) render(0.016);
    });
    resizeObserver.observe(host);
    applySize(host.clientWidth, host.clientHeight);
    measure();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('scroll', queueMeasure, { passive: true });
    window.addEventListener('resize', queueMeasure, { passive: true });

    let elapsed = 0;
    let frameId = 0;
    let pageVisible = !document.hidden;

    // three r186 起 THREE.Clock 已弃用，这里自己记时间戳
    let lastTime = performance.now();

    const render = (delta: number) => {
      // 指针与滚动进度都做阻尼，避免鼠标一动物体就跳
      const ease = 1 - Math.exp(-delta * 6);
      pointer.x += (target.x - pointer.x) * ease;
      pointer.y += (target.y - pointer.y) * ease;
      progress += (progressTarget - progress) * (1 - Math.exp(-delta * 4));

      handles?.update?.({ elapsed, delta, pointer, progress, scrollY, size });
      renderer.render(scene, camera);
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += delta;
      render(delta);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const syncRunning = () => {
      if (reduced) {
        // 减少动态：不跑循环，只在可见时补一帧静态构图
        if (visible) render(0.016);
        return;
      }
      if (visible && pageVisible) start();
      else stop();
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        syncRunning();
      },
      { rootMargin: '120px' },
    );
    intersectionObserver.observe(host);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      syncRunning();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // 首帧静态渲染：即使被 reduced-motion 挡住，也能看到完整构图
    render(0.016);
    host.dataset.ready = 'true';

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);

      handles?.dispose?.();

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => materials.add(item));
        else if (material) materials.add(material);
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());

      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [fov, fit]);

  return hostRef;
}
