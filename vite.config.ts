import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * Pages 的 base 由仓库名决定，而不是写死：
 * - 用户站仓库（<owner>.github.io）挂在域名根 → '/'
 * - 其他项目仓库挂在子路径 → '/<仓库名>/'
 * 本地 dev / CloudBase 落 `/`。
 */
const resolveBase = () => {
  if (process.env.GITHUB_ACTIONS !== 'true') return '/';
  const [owner = '', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
  if (!repo || repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) return '/';
  return `/${repo}/`;
};

export default defineConfig(() => ({
  base: resolveBase(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
