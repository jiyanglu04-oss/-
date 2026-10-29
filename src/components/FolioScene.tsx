import { type RefObject } from 'react';
import * as THREE from 'three';
import { useThreeStage } from '../three/useThreeStage';
import { createBox } from '../three/models';
import { PALETTE } from '../three/tokens';

type Props = {
  spreadRef: RefObject<number>;
};

/** 书本比例：接近 A5，竖着立在展台上 */
const BOOK_W = 2.3;
const BOOK_H = 2.9;
const SPINE_X = -BOOK_W / 2;

/**
 * 作品集的书本模型（three.js）。
 *
 * 造型按「一叠纸 + 前后封 + 书脊」堆出来，没有任何曲面 —— 呼应新粗野主义的平涂 + 粗描边。
 * 交互只有两件事，多了就腻：
 *  1. 指针视差：整本书轻微跟随鼠标转
 *  2. 翻页脉冲：章节变化时封面与内页依次翻开再合上（每层角度错开，像扇面）
 */
export default function FolioScene({ spreadRef }: Props) {
  const hostRef = useThreeStage(
    ({ scene }) => {
      const rig = new THREE.Group();
      scene.add(rig);

      // ---- 后封 + 纸芯 ----
      const back = createBox({ width: BOOK_W, height: BOOK_H, depth: 0.14, color: PALETTE.ink });
      back.position.z = -0.3;
      rig.add(back);

      const core = createBox({ width: BOOK_W - 0.22, height: BOOK_H - 0.16, depth: 0.2, color: PALETTE.paper2 });
      core.position.z = -0.13;
      rig.add(core);

      // 纸芯侧面压几条横线，远看就是「一叠纸」
      for (let i = 0; i < 4; i += 1) {
        const edge = createBox({
          width: 0.018,
          height: BOOK_H - 0.16,
          depth: 0.205,
          color: PALETTE.paper3,
          outline: 'none',
        });
        edge.position.set(BOOK_W / 2 - 0.11 + i * 0.012, 0, -0.13);
        rig.add(edge);
      }

      // ---- 可翻的页：越靠外翻得越开，形成扇面 ----
      const hinges: { group: THREE.Group; factor: number }[] = [];
      const leafSpecs = [
        { color: PALETTE.paper3, factor: 0.34 },
        { color: PALETTE.paper2, factor: 0.58 },
        { color: PALETTE.paper3, factor: 0.8 },
      ];

      leafSpecs.forEach((spec, index) => {
        const hinge = new THREE.Group();
        hinge.position.set(SPINE_X, 0, 0.02 + index * 0.035);
        const page = createBox({ width: BOOK_W - 0.1, height: BOOK_H - 0.1, depth: 0.026, color: spec.color });
        page.position.x = (BOOK_W - 0.1) / 2;
        hinge.add(page);
        rig.add(hinge);
        hinges.push({ group: hinge, factor: spec.factor });
      });

      // ---- 封面：比内页厚，贴一块荧光绿书名条 ----
      const coverHinge = new THREE.Group();
      coverHinge.position.set(SPINE_X, 0, 0.12);
      const cover = createBox({ width: BOOK_W, height: BOOK_H, depth: 0.12, color: PALETTE.ink });
      cover.position.x = BOOK_W / 2;
      coverHinge.add(cover);

      const label = createBox({ width: 1.34, height: 0.4, depth: 0.04, color: PALETTE.lime, outline: 'none' });
      label.position.set(BOOK_W / 2, 0.72, 0.075);
      coverHinge.add(label);

      const label2 = createBox({ width: 0.9, height: 0.14, depth: 0.04, color: PALETTE.paper2, outline: 'none' });
      label2.position.set(BOOK_W / 2 - 0.16, 0.34, 0.075);
      coverHinge.add(label2);

      // 书脊：一根竖条，把封面与后封在视觉上缝住
      const spine = createBox({ width: 0.16, height: BOOK_H, depth: 0.62, color: PALETTE.ink });
      spine.position.set(SPINE_X, 0, -0.12);
      rig.add(spine);

      rig.rotation.set(-0.1, 0.4, 0.02);

      let open = 0.14;
      let pulse = 0;
      let lastSpread = spreadRef.current ?? 0;

      return {
        update({ elapsed, delta, pointer }) {
          const spread = spreadRef.current ?? 0;
          if (spread !== lastSpread) {
            lastSpread = spread;
            pulse = 1;
          }
          // 脉冲按指数衰减：翻页瞬间张开，之后自己合回去
          pulse *= Math.exp(-delta * 2.1);

          const target = 0.14 + pulse * 1.02 + Math.sin(elapsed * 0.6) * 0.02;
          open += (target - open) * (1 - Math.exp(-delta * 8));

          // 以书脊为轴：负角才是朝观察者翻开
          coverHinge.rotation.y = -open;
          hinges.forEach(({ group, factor }) => {
            group.rotation.y = -open * factor;
          });

          rig.rotation.y = 0.4 + Math.sin(elapsed * 0.35) * 0.08 + pointer.x * 0.3;
          rig.rotation.x = -0.1 + Math.sin(elapsed * 0.5) * 0.035 - pointer.y * 0.14;
          rig.position.y = Math.sin(elapsed * 0.75) * 0.05;
        },
      };
    },
    { fov: 32, fit: 3.6 },
  );

  return <div ref={hostRef} className="nb-3d-host" />;
}
