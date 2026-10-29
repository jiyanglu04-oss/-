import * as THREE from 'three';
import { useThreeStage } from '../three/useThreeStage';
import { createStar } from '../three/models';
import { PALETTE } from '../three/tokens';

/**
 * 收尾页两枚星标的重型场景。纯装饰，不接任何点击。
 * 黑底上用纸白描边，对应 Design.md「黑底区块的硬阴影改用浅色」。
 */
export default function ClosingStarScene() {
  const hostRef = useThreeStage(
    ({ scene }) => {
      const big = createStar({
        tips: 5,
        outer: 1.1,
        inner: 0.46,
        depth: 0.38,
        color: PALETTE.lime,
        outline: 'paper',
        thickness: 1.03,
      });
      big.position.set(4.75, -0.15, 0);
      big.rotation.set(-0.3, 0, -0.12);
      scene.add(big);

      const small = createStar({
        tips: 6,
        outer: 1,
        inner: 0.44,
        depth: 0.3,
        color: PALETTE.lime,
        outline: 'paper',
        thickness: 1.04,
      });
      small.position.set(-4.9, 1.45, -0.6);
      small.scale.setScalar(0.62);
      small.rotation.set(0.28, 0, 0.2);
      scene.add(small);

      return {
        update({ elapsed, pointer }) {
          const t = elapsed;

          big.rotation.y = t * 0.3;
          big.rotation.x = -0.3 + Math.sin(t * 0.42) * 0.12;
          big.position.y = -0.15 + Math.sin(t * 0.5) * 0.1;
          big.position.x = 4.75 + pointer.x * 0.2;

          small.rotation.y = -t * 0.42;
          small.rotation.z = 0.2 + Math.sin(t * 0.55) * 0.16;
          small.position.x = -4.9 + pointer.x * 0.12;
          small.position.y = 1.45 + Math.cos(t * 0.46) * 0.09;
        },
      };
    },
    { fov: 34, fit: 6.2 },
  );

  return <div ref={hostRef} className="nb-3d-host" />;
}
