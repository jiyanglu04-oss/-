import * as THREE from 'three';
import { PALETTE } from './tokens';
import { createFlatMaterial, createOutlined, type OutlineStyle } from './materials';

type BaseOptions = {
  color: number;
  outline?: OutlineStyle;
  thickness?: number;
};

/**
 * 星形挤出体：2D Shape → ExtrudeGeometry 加倒角。
 * curveSegments / bevelSegments 都设为 1，保证是硬边切面而不是圆滑曲面。
 * 这是全站 3D 的主视觉母题 —— 呼应首屏跑马灯里的 ★。
 */
export function createStar({
  tips = 5,
  outer = 1,
  inner = 0.44,
  depth = 0.34,
  bevel = 0.07,
  color,
  outline = 'ink',
  thickness = 1.045,
}: BaseOptions & {
  tips?: number;
  outer?: number;
  inner?: number;
  depth?: number;
  bevel?: number;
}): THREE.Group {
  const shape = new THREE.Shape();
  const total = tips * 2;

  for (let i = 0; i < total; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments: 1,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  geometry.center();

  return createOutlined(geometry, { color, outline, thickness });
}

export function createBlock({ color, outline = 'ink', thickness = 1.05 }: BaseOptions): THREE.Group {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  return createOutlined(geometry, { color, outline, thickness });
}

export function createKnot({
  radius = 0.75,
  tube = 0.22,
  p = 2,
  q = 3,
  color,
  outline = 'ink',
}: BaseOptions & { radius?: number; tube?: number; p?: number; q?: number }): THREE.Group {
  const geometry = new THREE.TorusKnotGeometry(radius, tube, 72, 10, p, q);
  return createOutlined(geometry, { color, outline, thickness: 1.06 });
}

export function createRing({
  radius = 1.6,
  tube = 0.045,
  color,
  outline = 'none',
}: BaseOptions & { radius?: number; tube?: number }): THREE.Group {
  const geometry = new THREE.TorusGeometry(radius, tube, 6, 72);
  return createOutlined(geometry, { color, outline });
}

/**
 * 相机镜头：镜筒 + 对焦环 + 镜片。三件同轴堆叠，
 * 轴向统一转到 Z 轴，方便整体倾斜后仍有正确的透视。
 */
export function createLens({ color, outline = 'ink' }: BaseOptions): THREE.Group {
  const group = new THREE.Group();

  const barrelGeo = new THREE.CylinderGeometry(0.62, 0.66, 0.52, 22);
  barrelGeo.rotateX(Math.PI / 2);
  group.add(createOutlined(barrelGeo, { color, outline, thickness: 1.06 }));

  const rimGeo = new THREE.TorusGeometry(0.66, 0.075, 8, 30);
  group.add(createOutlined(rimGeo, { color, outline, thickness: 1.09 }));

  const ringGeo = new THREE.TorusGeometry(0.72, 0.055, 6, 30);
  const focus = createOutlined(ringGeo, { color: PALETTE.ink, outline, thickness: 1.08 });
  focus.position.z = -0.06;
  group.add(focus);

  const glassGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.56, 22);
  glassGeo.rotateX(Math.PI / 2);
  const glass = createOutlined(glassGeo, { color: PALETTE.ink, outline, thickness: 1.06 });
  glass.position.z = 0.02;
  group.add(glass);

  return group;
}

/** 任意尺寸的方块（转盘外的阵列、层板都用它） */
export function createBox({
  width = 1,
  height = 1,
  depth = 1,
  color,
  outline = 'ink',
  thickness = 1.05,
}: BaseOptions & { width?: number; height?: number; depth?: number }): THREE.Group {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  return createOutlined(geometry, { color, outline, thickness });
}

/**
 * 叶子：两条贝塞尔围成的尖头形状，沿 +Y 生长，原点在叶柄，
 * 所以叶片可以绕基点摆动。用来做「下一步」那棵树的 3D 嫩芽。
 */
export function createLeaf({
  length = 1,
  width = 0.46,
  depth = 0.07,
  color,
  outline = 'ink',
  thickness = 1.05,
}: BaseOptions & { length?: number; width?: number; depth?: number }): THREE.Group {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(width * 0.62, length * 0.3, width * 0.48, length * 0.8, 0, length);
  shape.bezierCurveTo(-width * 0.48, length * 0.8, -width * 0.62, length * 0.3, 0, 0);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 1,
  });

  return createOutlined(geometry, { color, outline, thickness });
}

/**
 * 5×7 像素字模。只收录站内用到的字母，够用就好 ——
 * 加新字母直接往这里补一行位图，不用改渲染逻辑。
 */
const PIXEL_FONT: Record<string, string[]> = {
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
};

/**
 * 像素方块立体字：把 5×7 字模的每个亮点做成一个带描边的立方体。
 * 这是「3D 建模」里最省钱也最像个人标识的做法 —— 拼出来的是站内 wordmark「JY」。
 *
 * plate=true 时会在字后面加一块底板：小尺寸当角标用时，没有底板的话
 * 十几个小方块在透视下会散开，读不出是一个标识。
 */
export function createMonogram({
  text = 'JY',
  color,
  outline = 'ink',
  depth = 0.86,
  pitch = 1.14,
  plate = false,
  plateColor = PALETTE.paper2,
}: BaseOptions & {
  text?: string;
  depth?: number;
  pitch?: number;
  plate?: boolean;
  plateColor?: number;
}): THREE.Group {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, depth);
  const fill = createFlatMaterial(color);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: outline === 'paper' ? PALETTE.paper2 : outline === 'lime' ? PALETTE.lime : PALETTE.ink,
    side: THREE.BackSide,
  });

  const letters = text.toUpperCase().split('').filter((letter) => PIXEL_FONT[letter]);
  if (!letters.length) return group;

  const rows = PIXEL_FONT[letters[0]].length;
  const columns = letters.reduce((sum, letter) => sum + PIXEL_FONT[letter][0].length, 0)
    + (letters.length - 1) * 0.2;

  if (plate) {
    const plateGeometry = new THREE.BoxGeometry((columns + 0.6) * pitch, (rows + 0.5) * pitch, 0.6);
    const backing = createOutlined(plateGeometry, { color: plateColor, outline, thickness: 1.02 });
    backing.position.z = -0.45;
    group.add(backing);
  }

  let cursor = 0;
  letters.forEach((letter) => {
    const bitmap = PIXEL_FONT[letter];
    bitmap.forEach((line, row) => {
      [...line].forEach((cell, column) => {
        if (cell !== '1') return;
        const x = (cursor + column - (columns - 1) / 2) * pitch;
        const y = ((rows - 1) / 2 - row) * pitch;

        const block = new THREE.Mesh(geometry, fill);
        block.position.set(x, y, 0);
        group.add(block);

        const shell = new THREE.Mesh(geometry, shellMaterial);
        shell.scale.setScalar(1.05);
        shell.position.set(x, y, 0);
        group.add(shell);
      });
    });
    // 字距压到 0.2 格：小尺寸当角标用时，字之间松了就读不出是一个 logo
    cursor += PIXEL_FONT[letter][0].length + 0.2;
  });

  return group;
}
