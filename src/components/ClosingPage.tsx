import { ArrowUpRight, Mail } from 'lucide-react';
import ClosingStar from './ClosingStar';

interface ClosingPageProps {
  onContactMe: () => void;
}

export default function ClosingPage({ onContactMe }: ClosingPageProps) {
  return (
    <section id="closing" className="closing-page" aria-labelledby="closing-title">
      <p className="closing-intro" data-reveal>
        很高兴你看到这里，下一段故事也许可以由我们一起完成
      </p>

      <div className="closing-stage" data-reveal>
        <ClosingStar />
        <h2 id="closing-title" className="closing-type">
          <span className="closing-title-sr">有些路，或许我们可以一起走！</span>
          <img
            className="closing-title-art"
            src="/closing-headline-brush.webp"
            alt=""
            aria-hidden="true"
          />
        </h2>

        <div className="closing-foot">
          <div className="closing-side closing-side-left">
            <small>OPEN TO</small>
            <p>产品 · 运营 · 内容创作 · 商业合作</p>
          </div>

          <button type="button" className="closing-action" onClick={onContactMe}>
            <Mail aria-hidden="true" />
            和我聊聊
            <ArrowUpRight aria-hidden="true" />
          </button>

          <div className="closing-side closing-side-right">
            <small>LET&apos;S WORK TOGETHER</small>
            <p>期待与你一起，把想法做成真正有价值的作品</p>
          </div>
        </div>
      </div>

      <p className="closing-email">1346514923@qq.com</p>
    </section>
  );
}
