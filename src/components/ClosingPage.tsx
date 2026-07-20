import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface ClosingPageProps {
  onEmail: () => void;
}

export default function ClosingPage({ onEmail }: ClosingPageProps) {
  return (
    <section id="closing" className="closing-page" aria-labelledby="closing-title">
      <motion.p
        className="closing-intro"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.55 }}
      >
        很高兴你看到这里，下一段故事也许可以由我们一起完成
      </motion.p>

      <div className="closing-stage">
        <motion.h2
          id="closing-title"
          className="closing-type"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75 }}
        >
          <span>我十分期待</span>
          <strong>与你合作</strong>
        </motion.h2>

        <span className="closing-dot" aria-hidden="true">•</span>

        <div className="closing-side closing-side-left">
          <small>OPEN TO</small>
          <p>产品 · 运营 · 内容创作 · 商业合作</p>
        </div>

        <div className="closing-side closing-side-right">
          <small>LET&apos;S WORK TOGETHER</small>
          <p>期待与你一起，把想法做成真正有价值的作品</p>
        </div>

        <button type="button" className="closing-action" onClick={onEmail}>
          <Mail aria-hidden="true" />
          和我聊聊
          <ArrowUpRight aria-hidden="true" />
        </button>
      </div>

      <p className="closing-email">1346514923@qq.com</p>
    </section>
  );
}
