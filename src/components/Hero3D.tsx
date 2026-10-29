import { Suspense, lazy } from 'react';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

/**
 * 首屏 3D 装置的轻量外壳。
 * 这里刻意不引入 three —— 真正吃体积的场景代码放在 Hero3DScene 里异步加载，
 * 首屏先出排版，装置随后淡入。
 */
export default function Hero3D() {
  return (
    <div className="nb-3d nb-3d--hero" aria-hidden="true">
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>
    </div>
  );
}
