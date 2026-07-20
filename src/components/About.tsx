import { motion } from 'motion/react';
import { ArrowDownToLine, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  return (
    <section id="about" className="editorial-about">
      <div className="about-grid">
        <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="identity-card">
          <div className="lanyard">JY · 2026</div>
          <div className="identity-photo"><img src={`${import.meta.env.BASE_URL}avatar-cutout.png`} alt="陆机阳头像" /></div>
          <div className="identity-copy">
            <small>/ ID · 2026</small>
            <h3>陆机阳</h3><em>Jackson Lu</em>
            <p>产品 · 运营 · AI 实践</p>
            <div className="identity-tags"><span>explorer</span><span>operator</span><span>creator</span></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="about-copy">
          <div className="section-kicker">/ 关于我</div>
          <h2>产品、运营、创作，<br /><span>都是解决问题的方式。</span></h2>
          <h3>产品经理和运营的探索者</h3>
          <p className="about-bio">{personalInfo.bio}</p>
          <div className="about-facts">
            <div><small>教育背景 / 专业</small><strong>{personalInfo.university}</strong><span>{personalInfo.major}</span></div>
            <div><small>当前所在地</small><strong><MapPin /> {personalInfo.location}</strong><span>开放商业合作与企业实习</span></div>
          </div>
          <div className="about-actions">
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">查看简历 <ArrowDownToLine /></a>
            <a href={`mailto:${personalInfo.email}`}>邮箱联系 <Mail /></a>
            <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>继续了解 <ArrowUpRight /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
