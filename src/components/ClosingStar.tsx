import { Suspense, lazy } from 'react';

const ClosingStarScene = lazy(() => import('./ClosingStarScene'));

/** 收尾页 3D 星标的轻量外壳，场景代码异步加载。 */
export default function ClosingStar() {
  return (
    <div className="nb-3d nb-3d--closing" aria-hidden="true">
      <Suspense fallback={null}>
        <ClosingStarScene />
      </Suspense>
    </div>
  );
}
