import { useRef } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Bookmark, Sparkles, Video } from 'lucide-react';
import { personalInfo, skillCategories } from '../data';
import Section3D from './Section3D';

const stats = [
  { metric: '150w+', label: '小红书个人内容曝光' },
  { metric: '1.5亿+', label: 'KOS 项目内容曝光' },
  { metric: '3,000+', label: 'KOS 项目留资' },
  { metric: '500+', label: 'KOS 项目成交' },
];

function skillIcon(name: string) {
  const props = { 'aria-hidden': true } as const;
  switch (name) {
    case 'BarChart3':
      return <BarChart3 {...props} />;
    case 'Video':
      return <Video {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

export default function Advantages() {
  const towerFocus = useRef<number | null>(null);

  return (
    <section id="advantages" className="adv-section">
      <div className="adv-shell">
        <header className="adv-head" data-reveal>
          <div className="nb-head-core">
            <p className="section-kicker section-title-english">CORE STRENGTHS</p>
            <h2>我的技术与竞争优势</h2>
            <p>把内容创作、数据分析和 AI 工具串成一条可复用的运营链路，是我最擅长的事。</p>
          </div>
          <Section3D layout="tower" count={skillCategories.length} focusRef={towerFocus} />
        </header>

        <div className="adv-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="adv-traits"
          >
            <span className="adv-traits-icon">
              <Bookmark aria-hidden="true" />
            </span>
            <h3 className="adv-traits-title">核心个人特质总结</h3>
            <p className="adv-traits-lead">自媒体创作与运营、Vibe Coding 项目、项目运营和产品思维</p>

            <div className="adv-trait-list">
              {personalInfo.advantages.map((adv, idx) => (
                <div className="adv-trait" key={idx}>
                  <i aria-hidden="true" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="adv-skills">
            {skillCategories.map((cat, idx) => (
              <motion.article
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="adv-skill"
                onPointerEnter={() => { towerFocus.current = idx; }}
                onPointerLeave={() => { towerFocus.current = null; }}
              >
                <div className="adv-skill-head">
                  <span className="adv-skill-icon">{skillIcon(cat.icon)}</span>
                  <div>
                    <h3 className="adv-skill-title">{cat.title}</h3>
                    <p className="adv-skill-desc">{cat.description}</p>
                  </div>
                </div>

                <div className="adv-skill-items">
                  {cat.items.map((item) => (
                    <div className="adv-skill-item" key={item.name}>
                      <strong>{item.name}</strong>
                      {item.details && <span>{item.details}</span>}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="adv-stats">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="adv-stat"
            >
              <strong>{stat.metric}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
