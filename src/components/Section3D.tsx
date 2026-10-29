import { Suspense, lazy, type RefObject } from 'react';
import type { ArrayLayout } from './ArrayScene';

const ArrayScene = lazy(() => import('./ArrayScene'));

type Props = {
  layout: ArrayLayout;
  count: number;
  focusRef: RefObject<number | null>;
  className?: string;
};

/**
 * 区块标题旁的 3D 阵列（轻量外壳，three 场景异步加载）。
 * 只负责占位与图层；具体形状由 ArrayScene 按 layout 生成。
 */
export default function Section3D({ layout, count, focusRef, className = 'nb-head-orn' }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <Suspense fallback={null}>
        <ArrayScene layout={layout} count={count} focusRef={focusRef} />
      </Suspense>
    </div>
  );
}
