import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  CheckCircle,
  GraduationCap,
  ShoppingBag,
  Trophy,
} from 'lucide-react';
import { experiences, timelineEvents } from '../data';
import Section3D from './Section3D';

const experienceLogos: Record<string, { src: string; alt: string; variantClass: string }> = {
  'exp-oppo-paipai': {
    src: 'experience-logos/oppo-centered.webp',
    alt: 'OPPO 品牌标识',
    variantClass: 'exp-logo--contain',
  },
  // 千易 logo 源图是「纯白描线 + 透明底」，需经 --mono 强制转墨黑才可见
  'exp-qy': {
    src: 'experience-logos/qianyi.webp',
    alt: '千易文化品牌标识',
    variantClass: 'exp-logo--contain exp-logo--mono',
  },
  'exp-netease-camp': {
    src: 'experience-logos/netease-centered.webp',
    alt: '网易品牌标识',
    variantClass: 'exp-logo--contain',
  },
  'exp-jnu': { src: 'experience-logos/jnu.webp', alt: '暨南大学校徽', variantClass: 'exp-logo--square' },
};

function ExperienceLogo({ experienceId }: { experienceId: string }) {
  const logo = experienceLogos[experienceId];
  if (!logo) return null;

  return (
    <div className={`exp-logo ${logo.variantClass}`}>
      <img src={`${import.meta.env.BASE_URL}${logo.src}`} alt={logo.alt} loading="lazy" />
    </div>
  );
}

function timelineIcon(name: string) {
  const props = { 'aria-hidden': true } as const;
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Camera':
      return <Camera {...props} />;
    case 'Trophy':
      return <Trophy {...props} />;
    case 'Award':
      return <Award {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    default:
      return <Briefcase {...props} />;
  }
}

export default function ExperienceTimeline() {
  const [viewTab, setViewTab] = useState<'internship' | 'timeline'>('internship');
  const spiralFocus = useRef<number | null>(null);

  const switchTab = (tab: 'internship' | 'timeline') => {
    setViewTab(tab);
    // 切到里程碑视图时，螺旋里的方块都回到静止态
    spiralFocus.current = null;
  };

  return (
    <section id="experience" className="exp-section">
      <header className="exp-head" data-reveal>
        <p className="section-kicker section-title-english">PROFESSIONAL JOURNEY</p>
        <h2>我的经历与成长轨迹</h2>
        <Section3D layout="ladder" count={experiences.length} focusRef={spiralFocus} />
      </header>

      <div className="exp-switch">
        <div className="exp-switch-group" role="tablist" aria-label="经历视图切换">
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === 'internship'}
            onClick={() => switchTab('internship')}
            className={`exp-switch-btn${viewTab === 'internship' ? ' is-active' : ''}`}
          >
            <Building2 aria-hidden="true" />
            <span>实习及岗位经历</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === 'timeline'}
            onClick={() => switchTab('timeline')}
            className={`exp-switch-btn${viewTab === 'timeline' ? ' is-active' : ''}`}
          >
            <Calendar aria-hidden="true" />
            <span>成长里程碑</span>
          </button>
        </div>
      </div>

      <div className="exp-panel">
        {viewTab === 'internship' ? (
          <div className="exp-list">
            {experiences.map((exp, idx) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(idx, 2) * 0.1 }}
                className="exp-card"
                onPointerEnter={() => { spiralFocus.current = idx; }}
                onPointerLeave={() => { spiralFocus.current = null; }}
              >
                <header className="exp-card-head">
                  <div className="exp-identity">
                    <ExperienceLogo experienceId={exp.id} />
                    <div>
                      <h3 className="exp-company">{exp.company}</h3>
                      <p className="exp-role">{exp.role}</p>
                    </div>
                  </div>

                  <span className="exp-period">
                    <Calendar aria-hidden="true" />
                    {exp.period}
                  </span>
                </header>

                <div className="exp-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div className="exp-bullet" key={bIdx}>
                      <h4 className="exp-bullet-title">
                        <CheckCircle aria-hidden="true" />
                        <span>{bullet.title}</span>
                      </h4>
                      <p className="exp-bullet-desc">{bullet.description}</p>
                    </div>
                  ))}
                </div>

                {exp.impact && (
                  <footer className="exp-foot">
                    <span className="exp-foot-label">MILESTONE &amp; VALUE GENERATED</span>
                    <span className="exp-impact">
                      <CheckCircle aria-hidden="true" />
                      项目收益：{exp.impact}
                    </span>
                  </footer>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="exp-timeline">
            {timelineEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{ duration: 0.45 }}
                className="exp-tl-item"
              >
                <span className="exp-tl-node" aria-hidden="true">
                  <i />
                </span>

                <article className="exp-tl-card">
                  <div className="exp-tl-meta">
                    <span className="exp-tl-tag">
                      <span className="exp-tl-tag-icon">{timelineIcon(event.iconName)}</span>
                      {event.subtitle}
                    </span>
                    <span className="exp-tl-date">{event.date}</span>
                  </div>

                  <h4 className="exp-tl-title">{event.title}</h4>
                  <p className="exp-tl-desc">{event.description}</p>
                </article>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
