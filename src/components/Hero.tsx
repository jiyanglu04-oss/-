import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Hero3D from './Hero3D';

interface HeroProps {
  onViewProjects: () => void;
  onContactMe: () => void;
}

const marqueeItems = [
  'AI × OPERATOR',
  '产品运营',
  '数据分析',
  '小红书内容',
  '视觉中国签约摄影师',
  'VIBE CODING',
  '跨境电商',
  '活动统筹',
];

const focusTags = ['AI 平台', '小红书创作运营', '电商运营', '新媒体运营', '产品经理'];

function MarqueeRow() {
  return (
    <div>
      {marqueeItems.map((item) => (
        <span key={item}>
          {item} <i aria-hidden="true">★</i>
        </span>
      ))}
    </div>
  );
}

export default function Hero({ onViewProjects, onContactMe }: HeroProps) {
  return (
    <section id="home" className="nb-hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-type" aria-label="Hi！我是 Jackson Lu">
            <span className="hero-word-wrap">
              <span className="hero-word">Hi！我是</span>
            </span>
            <span className="hero-word-wrap hero-word-wrap--mark">
              <strong className="hero-word">Jackson Lu</strong>
            </span>
          </h1>

          <p className="hero-eyebrow">
            一名正在成长的 <span className="hero-role">AI x OPERATOR</span>
          </p>

          <p className="hero-intro-copy">
            暨南大学金融工程学生，正在探索 AI、产品、运营与内容创作的交叉地带。
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-action" onClick={onViewProjects}>
              查看项目 <ArrowUpRight aria-hidden="true" />
            </button>
            <button type="button" className="secondary-action" onClick={onContactMe}>
              联系我 <ArrowDownRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="陆机阳个人肖像">
          <div className="nb-hero-blob" aria-hidden="true" />
          <Hero3D />
          <div className="hero-portrait-wrap">
            <img
              src={`${import.meta.env.BASE_URL}hero-handdrawn-cutout-final.webp`}
              alt="陆机阳手绘风格个人肖像"
              className="hero-portrait"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="nb-sticker nb-sticker--yellow nb-hero-sticker-left">
            <b>目前在做什么？</b>
            <span>
              暨南大学金融工程
              <br />
              产品与运营探索者
            </span>
          </div>

          <div className="nb-sticker nb-sticker--pink nb-hero-sticker-right">
            <b>关注方向</b>
            <span>
              AI 工具 / 新媒体
              <br />
              产品与运营实践
            </span>
          </div>
        </div>
      </div>

      <div className="nb-marquee nb-hero-marquee" aria-hidden="true">
        <div className="nb-marquee-track">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      <aside className="hero-summary nb-hero-summary" aria-label="我的方向">
        <span className="nb-hero-summary-label">
          <b>我的方向</b>
          <i>FOCUS</i>
        </span>

        <div className="nb-hero-summary-body">
          <p>
            我致力于运用正在学习的<mark>产品与运营思维</mark>赋能工作，并尝试用 <mark>AI</mark>{' '}
            把自己的想法做成结果。
          </p>
          <ul className="nb-hero-summary-tags">
            {focusTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
