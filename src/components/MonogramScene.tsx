import { type RefObject } from 'react';
import * as THREE from 'three';
import { useThreeStage } from '../three/useThreeStage';
import { createMonogram } from '../three/models';
import { PALETTE } from '../three/tokens';

type Props = {
  focusRef: RefObject<number | null>;
};

/**
 * 首屏之后的个人徽标：用立方体拼出的「JY」立体字，
 * 挂在身份卡右上角，像一枚立体的全息贴纸。
 * 悬停身份卡时它会转得更快、微微放大 —— 3D 反应和鼠标位置是对得上的。
 */
export default function MonogramScene({ focusRef }: Props) {
  const hostRef = useThreeStage(
    ({ scene }) => {
      const rig = new THREE.Group();
      rig.scale.setScalar(0.38);
      scene.add(rig);

      rig.add(createMonogram({
        text: 'JY',
        // 荧光绿底 + 墨黑字：贴在白色工牌和深色照片上都压得住
        color: PALETTE.ink,
        plate: true,
        plateColor: PALETTE.lime,
        depth: 0.9,
      }));

      let boost = 0;

      return {
        update({ elapsed, delta, pointer }) {
          const wanted = focusRef.current === 0 ? 1 : 0;
          boost += (wanted - boost) * (1 - Math.exp(-delta * 6));

          // 小尺寸角标：摆幅必须收着，不然透视会把方块拆散、读不出字
          rig.rotation.y = Math.sin(elapsed * 0.35) * 0.16
            + pointer.x * 0.26
            + boost * Math.sin(elapsed * 2.6) * 0.16;
          rig.rotation.x = Math.sin(elapsed * 0.5) * 0.04 - pointer.y * 0.1;
          rig.rotation.z = Math.sin(elapsed * 0.28) * 0.02;
          rig.scale.setScalar(0.38 * (1 + boost * 0.1));
          rig.position.y = Math.sin(elapsed * 0.8) * 0.05 * (1 + boost * 0.6);
        },
      };
    },
    { fov: 34, fit: 4.6 },
  );

  return <div ref={hostRef} className="nb-3d-host" />;
}
