import * as THREE from 'three';
import { useThreeStage } from '../three/useThreeStage';
import { createBlock, createStar } from '../three/models';
import { PALETTE } from '../three/tokens';

/**
 * 首屏两件小雕塑的重型场景（three.js 在这里，异步加载）。
 * 图层顺序：色块 0 < 画布 1 < 人像 2 < 贴纸。
 *
 * 摆放约束（改位置时按这个来）：
 *  · fit=5 时可视范围约 x∈[-2.5,2.5]、y∈[-2.7,2.7]
 *  · 物体中心到边缘要留出自身半径，否则会被画布裁掉
 *  · 右上被粉色贴纸、左下被黄色贴纸遮住，别往那放
 */
export default function Hero3DScene() {
  const hostRef = useThreeStage(
    ({ scene }) => {
      const rig = new THREE.Group();
      scene.add(rig);

      const star = createStar({
        tips: 6,
        outer: 1,
        inner: 0.44,
        depth: 0.36,
        color: PALETTE.lime,
        outline: 'ink',
      });
      star.position.set(-1.52, 1.62, 0.5);
      star.scale.setScalar(0.62);
      star.rotation.set(-0.24, 0, -0.22);
      rig.add(star);

      const cube = createBlock({ color: PALETTE.yellow, outline: 'ink' });
      cube.position.set(1.3, -1.72, 0.2);
      cube.scale.setScalar(0.44);
      cube.rotation.set(0.52, 0.72, 0.14);
      rig.add(cube);

      return {
        update({ elapsed, pointer, scrollY }) {
          const t = elapsed;

          star.rotation.y = t * 0.34;
          star.rotation.x = -0.24 + Math.sin(t * 0.62) * 0.14;
          star.position.y = 1.62 + Math.sin(t * 0.72) * 0.09;

          cube.rotation.y = 0.72 + t * 0.36;
          cube.rotation.x = 0.52 + Math.sin(t * 0.62) * 0.16;
          cube.position.y = -1.72 + Math.sin(t * 0.58 + 1.7) * 0.09;
          cube.position.x = 1.3 + Math.cos(t * 0.44) * 0.05;

          // 指针视差 + 滚动轻微下沉，整体只在 ±0.3 单位内动，避免抢主体
          rig.rotation.y = pointer.x * 0.2;
          rig.rotation.x = pointer.y * 0.14;
          rig.position.x = pointer.x * 0.22;
          rig.position.y = -pointer.y * 0.16 - Math.min(scrollY, 900) * 0.00045;
        },
      };
    },
    { fov: 34, fit: 5 },
  );

  return <div ref={hostRef} className="nb-3d-host" />;
}
