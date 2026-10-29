/**
 * 3D 层色板 —— 与 neo-brutalism.css 的 :root 令牌一一对应。
 * 新增颜色请先在 CSS 里加令牌，再在这里镜像一份，避免两套色值漂移。
 */
export const PALETTE = {
  ink: 0x0a0a0a,
  paper: 0xf3f2ec,
  paper2: 0xffffff,
  paper3: 0xe6e4db,
  lime: 0xc6f53c,
  limeDeep: 0xa5d620,
  yellow: 0xffd23f,
  pink: 0xff5c8a,
  blue: 0x4da3ff,
  orange: 0xff8a3d,
  muted: 0x6b6b63,
} as const;

export type PaletteKey = keyof typeof PALETTE;
