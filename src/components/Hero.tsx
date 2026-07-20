import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface HeroProps { onViewProjects: () => void; onContactMe: () => void; }

export default function Hero({ onViewProjects, onContactMe }: HeroProps) {
  return (
    <section id="home" className="editorial-hero">
      <div className="hero-intro">👋 你好，我是陆机阳，一名正在成长的</div>
      <div className="hero-stage">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="hero-type">
          <span>AI × PRODUCT</span><strong>OPERATOR</strong>
        </motion.div>
        <div className="hero-dot">•</div>
        <div className="hero-current"><small>CURRENTLY</small><p>暨南大学金融工程 · 产品与运营探索者</p></div>
        <motion.div initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="hero-portrait-wrap">
          <img src={`${import.meta.env.BASE_URL}avatar-cutout.png`} alt="陆机阳个人肖像" className="hero-portrait" />
        </motion.div>
        <div className="hero-focus"><small>FOCUSING ON</small><p>AI 工具 · 新媒体创作 · 电商运营 · 产品实践</p></div>
        <div className="hero-actions">
          <button className="primary-action" onClick={onViewProjects}>查看项目 <ArrowUpRight /></button>
          <button className="secondary-action" onClick={onContactMe}>联系我 <ArrowDownRight /></button>
        </div>
      </div>
      <p className="hero-summary">我致力于运用正在学习的产品和运营思维赋能工作，并尝试用 AI 实现自己的 ideas；AI 平台、小红书创作运营、电商运营、新媒体运营与产品经理，都是我持续摸索的方向。</p>
    </section>
  );
}
