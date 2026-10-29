import * as THREE from 'three';
import { PALETTE } from './tokens';

export type OutlineStyle = 'ink' | 'paper' | 'lime' | 'none';

const OUTLINE_COLORS: Record<Exclude<OutlineStyle, 'none'>, number> = {
  ink: PALETTE.ink,
  paper: PALETTE.paper2,
  lime: PALETTE.lime,
};

/**
 * 平涂兰伯特材质：flatShading 让每个三角面只有一种颜色，
 * 得到「低多边形 / 色块化」的观感 —— 这是新粗野主义 3D 的核心。
 */
export function createFlatMaterial(color: number) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export type OutlinedOptions = {
  color: number;
  outline?: OutlineStyle;
  /** 外壳放大比例：1.04 约等于 4% 的描边厚度 */
  thickness?: number;
};

/**
 * 反向外壳描边（inverted hull）：复制一份几何体翻成背面、略微放大，
 * 于是物体外部多出一圈实色轮廓 —— 等价于 CSS 里的粗黑描边。
 * WebGL 的 linewidth 在多数平台恒为 1px，所以不用 LineSegments 做描边。
 */
export function createOutlined(
  geometry: THREE.BufferGeometry,
  { color, outline = 'ink', thickness = 1.045 }: OutlinedOptions,
): THREE.Group {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geometry, createFlatMaterial(color)));

  if (outline !== 'none') {
    const shell = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: OUTLINE_COLORS[outline],
        side: THREE.BackSide,
      }),
    );
    shell.scale.setScalar(thickness);
    shell.renderOrder = -1;
    group.add(shell);
  }

  return group;
}

/** 场景通用光照：一盏冷白主光 + 一盏补光 + 高比例环境光，保证暗面仍是有色块的平涂。 */
export function createStageLights() {
  const group = new THREE.Group();

  group.add(new THREE.AmbientLight(0xffffff, 1.35));

  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(4, 6.5, 6);
  group.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.85);
  fill.position.set(-6, -3, 2);
  group.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 0.55);
  rim.position.set(-2, 4, -7);
  group.add(rim);

  return group;
}
