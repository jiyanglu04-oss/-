import { useRef } from 'react';
import { Award, Briefcase, Target } from 'lucide-react';
import { futurePlans } from '../data';
import Section3D from './Section3D';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Briefcase': return <Briefcase />;
    case 'Award': return <Award />;
    default: return <Target />;
  }
};

export default function FuturePlan() {
  const stepFocus = useRef<number | null>(null);

  return (
    <section id="future-plan" className="future-section">
      <div className="future-shell">
        <header className="future-heading" data-reveal>
          <div className="nb-head-core">
            <p className="section-kicker section-title-english">FUTURE DIRECTION</p>
            <h2>下一步，继续把想法做成结果。</h2>
            <p>清晰的路径才能抵达远方。以下是我对未来发展的阶段性规划。</p>
          </div>
          <Section3D layout="steps" count={futurePlans.length} focusRef={stepFocus} />
        </header>

        <div className="future-roadmap">
          {futurePlans.map((plan, index) => (
            <article
              className="future-card"
              key={plan.id}
              data-reveal
              onPointerEnter={() => { stepFocus.current = index; }}
              onPointerLeave={() => { stepFocus.current = null; }}
            >
              <div className="future-card-top">
                <span className="future-icon" aria-hidden="true">{getIcon(plan.iconName)}</span>
                <span className="future-category">{plan.category}</span>
                <time>{plan.timeframe}</time>
              </div>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <span className="future-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
