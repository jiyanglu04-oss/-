import { Suspense, lazy, type RefObject } from 'react';

const MonogramScene = lazy(() => import('./MonogramScene'));

type Props = {
  focusRef: RefObject<number | null>;
};

/** 身份卡角标：见 MonogramScene，外壳不引入 three。 */
export default function AboutBadge({ focusRef }: Props) {
  return (
    <div className="identity-badge" aria-hidden="true">
      <Suspense fallback={null}>
        <MonogramScene focusRef={focusRef} />
      </Suspense>
    </div>
  );
}
