import { type RefObject } from 'react';
import * as THREE from 'three';
import { useThreeStage } from '../three/useThreeStage';
import { createFlatMaterial } from '../three/materials';
import { PALETTE } from '../three/tokens';

export type ArrayLayout = 'ladder' | 'tower' | 'steps';

type Props = {
  layout: ArrayLayout;
  count: number;
  focusRef: RefObject<number | null>;
};

type Item = {
  group: THREE.Group;
  fill: THREE.MeshLambertMaterial;
  base: THREE.Vector3;
  active: number;
};

const LIME = new THREE.Color(PALETTE.lime);
const YELLOW = new THREE.Color(PALETTE.yellow);

/** 每格的尺寸：塔是越往上越窄的层板，其余是立方块 */
function sizeFor(layout: ArrayLayout, index: number, total: number): THREE.Vector3 {
  if (layout === 'tower') {
    const t = total <= 1 ? 1 : index / (total - 1);
    return new THREE.Vector3(2.3 - t * 0.75, 0.4, 1.4 - t * 0.42);
  }
  if (layout === 'steps') return new THREE.Vector3(1.18, 0.98, 1.18);
  return new THREE.Vector3(0.8, 0.8, 0.8);
}

/** 三种排布：经历=左右交替的成长梯 / 优势=三层塔 / 规划=递升阶梯 */
function positionFor(layout: ArrayLayout, index: number, total: number): THREE.Vector3 {
  const span = Math.max(total - 1, 1);

  if (layout === 'ladder') {
    return new THREE.Vector3(index % 2 === 0 ? -0.62 : 0.62, -1.38 + (index / span) * 2.76, 0);
  }

  if (layout === 'tower') {
    return new THREE.Vector3(0, -1.0 + (index / span) * 1.85, 0);
  }

  return new THREE.Vector3((index - (total - 1) / 2) * 1.55, -1.05 + (index / span) * 1.55, 0);
}

/**
 * 内容联动的方块阵列。
 * 每一格对应页面上的一条内容（一段经历 / 一类技能 / 一个规划）：
 * 鼠标悬停到那条内容上，对应方块会抬起、放大并变成柠檬黄 —— 3D 和内容是严格一一对应的。
 */
export default function ArrayScene({ layout, count, focusRef }: Props) {
  const hostRef = useThreeStage(
    ({ scene }) => {
      const rig = new THREE.Group();
      scene.add(rig);

      const shellMaterial = new THREE.MeshBasicMaterial({
        color: PALETTE.ink,
        side: THREE.BackSide,
      });

      const items: Item[] = [];

      for (let index = 0; index < count; index += 1) {
        const size = sizeFor(layout, index, count);
        const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);

        const fill = createFlatMaterial(PALETTE.lime);
        const group = new THREE.Group();
        group.add(new THREE.Mesh(geometry, fill));

        const shell = new THREE.Mesh(geometry, shellMaterial);
        shell.scale.setScalar(1.05);
        group.add(shell);

        const base = positionFor(layout, index, count);
        group.position.copy(base);
        group.rotation.y = layout === 'ladder' ? index * 0.42 : index * 0.14;
        rig.add(group);

        items.push({ group, fill, base: base.clone(), active: 0 });
      }

      return {
        update({ elapsed, delta, pointer }) {
          const focus = focusRef.current;
          const ease = 1 - Math.exp(-delta * 9);

          items.forEach((item, index) => {
            const wanted = focus === index ? 1 : 0;
            item.active += (wanted - item.active) * ease;
            const a = item.active;

            const lift = layout === 'ladder' ? 0.16 : layout === 'steps' ? 0.3 : 0.28;
            item.group.position.y = item.base.y + a * lift;
            item.group.position.x = item.base.x + (layout === 'ladder' ? Math.sign(item.base.x || 1) * a * 0.22 : 0);
            item.group.scale.setScalar(1 + a * 0.14);

            item.group.rotation.y += delta * (0.22 + a * 0.55);
            item.fill.color.copy(LIME).lerp(YELLOW, a);
          });

          rig.rotation.y = Math.sin(elapsed * 0.22) * 0.26 + pointer.x * 0.24;
          rig.rotation.x = pointer.y * 0.1;
          rig.position.y = Math.sin(elapsed * 0.6) * 0.04;
        },
      };
    },
    { fov: 34, fit: layout === 'tower' ? 3.9 : 4.6 },
  );

  return <div ref={hostRef} className="nb-3d-host" />;
}
