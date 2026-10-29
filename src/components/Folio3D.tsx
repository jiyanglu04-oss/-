import { Suspense, lazy, type RefObject } from 'react';

const FolioScene = lazy(() => import('./FolioScene'));

type Props = {
  /** 当前章节序号，变化时驱动模型翻页 */
  spreadRef: RefObject<number>;
};

/** 作品集标题行里的「书本模型」（轻量外壳，不 import three）。 */
export default function Folio3D({ spreadRef }: Props) {
  return (
    <div className="nb-portfolio-orn folio-orn" aria-hidden="true">
      <Suspense fallback={null}>
        <FolioScene spreadRef={spreadRef} />
      </Suspense>
    </div>
  );
}
