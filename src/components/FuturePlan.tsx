import { useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Briefcase,
  Rocket,
  Award,
  TrendingUp,
  GraduationCap,
  Target,
  Compass,
  Star
} from 'lucide-react';
import { futurePlans } from '../data';

const categoryColor: Record<string, { border: string; bg: string; text: string; glow: string; tape: string }> = {
  '职业': { border: 'border-blue-300', bg: 'bg-blue-50/80', text: 'text-blue-700', glow: 'shadow-blue-200/40', tape: 'bg-blue-200/70' },
  '学习': { border: 'border-emerald-300', bg: 'bg-emerald-50/80', text: 'text-emerald-700', glow: 'shadow-emerald-200/40', tape: 'bg-emerald-200/70' },
  '创业': { border: 'border-amber-300', bg: 'bg-amber-50/80', text: 'text-amber-700', glow: 'shadow-amber-200/40', tape: 'bg-amber-200/70' },
  '个人': { border: 'border-purple-300', bg: 'bg-purple-50/80', text: 'text-purple-700', glow: 'shadow-purple-200/40', tape: 'bg-purple-200/70' },
};

const getIcon = (iconName: string) => {
  const cn = 'w-4 h-4';
  switch (iconName) {
    case 'Briefcase': return <Briefcase className={cn} />;
    case 'Rocket': return <Rocket className={cn} />;
    case 'Award': return <Award className={cn} />;
    case 'TrendingUp': return <TrendingUp className={cn} />;
    case 'GraduationCap': return <GraduationCap className={cn} />;
    default: return <Target className={cn} />;
  }
};

const cardTilt = ['-1.5deg', '1.2deg', '-0.8deg', '1.8deg'];

function PlanCard({
  plan,
  idx,
  color,
}: {
  plan: (typeof futurePlans)[number];
  idx: number;
  color: (typeof categoryColor)[string];
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 14 });
  const springY = useSpring(y, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / 10);
    y.set((e.clientY - cy) / 10);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: idx % 2 === 0 ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: 0.2 + idx * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.03,
        zIndex: 20,
        transition: { duration: 0.25 },
      }}
      className="relative"
    >
      <motion.div
        className={`relative bg-white rounded-xl border-2 ${color.border} p-5 md:p-6 shadow-md ${color.glow} transition-shadow duration-300`}
        whileHover={{ boxShadow: '0 20px 50px rgba(0,0,0,0.12)', rotate: cardTilt[idx % cardTilt.length] }}
        style={{ rotate: '0deg' }}
      >
        {/* Washi tape */}
        <div
          className={`absolute w-12 h-4 ${color.tape} opacity-60 rounded-sm`}
          style={{
            top: '-9px',
            left: idx % 2 === 0 ? '35%' : '55%',
            transform: `rotate(${idx % 3 === 0 ? '-5deg' : idx % 3 === 1 ? '4deg' : '-3deg'})`,
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <motion.div
            className={`p-1.5 rounded-lg ${color.bg} ${color.text}`}
            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
          >
            {getIcon(plan.iconName)}
          </motion.div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color.border} ${color.bg} ${color.text}`}>
            {plan.category}
          </span>
          <motion.div whileHover={{ rotate: 360, transition: { duration: 0.6 } }}>
            <Star className="w-3 h-3 text-amber-400 ml-auto" />
          </motion.div>
        </div>

        <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2 leading-snug">{plan.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{plan.description}</p>

      </motion.div>
    </motion.div>
  );
}

// SVG connector lines between NOW and cards
function ConnectorLines() {
  const lines = [
    // top-left
    { x1: '50%', y1: '50%', x2: '22%', y2: '10%' },
    // top-right
    { x1: '50%', y1: '50%', x2: '78%', y2: '10%' },
    // bottom-left
    { x1: '50%', y1: '50%', x2: '22%', y2: '90%' },
    // bottom-right
    { x1: '50%', y1: '50%', x2: '78%', y2: '90%' },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="connectorGrad" x1="50%" y1="50%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      {lines.map((l, idx) => (
        <motion.line
          key={idx}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="url(#connectorGrad)"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.22 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 + idx * 0.08, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export default function FuturePlan() {
  return (
    <section id="future-plan" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #475569 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
      />

      {/* Ambient glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-200/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-brand-200/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Future Blueprint · 未来规划</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative"
          >
            我的未来规划
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-slate-500 text-sm max-w-lg leading-relaxed"
          >
            清晰的路径才能抵达远方。以下是我对未来发展的阶段性规划。
          </motion.p>
        </div>

        {/* Grid layout with central NOW anchor */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG connector overlay */}
          <ConnectorLines />

          {/* NOW anchor: absolute overlay on desktop, in-flow on mobile */}
          <div className="flex justify-center mb-8 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-white border-2 border-slate-300 shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.08, borderColor: '#94a3b8', transition: { duration: 0.2 } }}
              >
                <span className="text-sm font-bold text-slate-600 font-display">NOW</span>
              </motion.div>
              <span className="text-[9px] text-slate-400 font-mono mt-1.5 tracking-widest">2026</span>
            </motion.div>
          </div>

          {/* Desktop grid - 2x2 layout */}
          <div className="hidden md:grid grid-cols-3 gap-y-6 gap-x-4 items-start">
            {/* Row 1: card 0, card 1 */}
            <div className="col-span-1">
              <PlanCard plan={futurePlans[0]} idx={0} color={categoryColor[futurePlans[0].category] || categoryColor['职业']} />
            </div>
            <div className="col-span-1" /> {/* NOW overlays center */}
            <div className="col-span-1">
              <PlanCard plan={futurePlans[1]} idx={1} color={categoryColor[futurePlans[1].category] || categoryColor['职业']} />
            </div>

            {/* Row 2: card 2, card 3 */}
            <div className="col-span-1 pt-12">
              <PlanCard plan={futurePlans[2]} idx={2} color={categoryColor[futurePlans[2].category] || categoryColor['职业']} />
            </div>
            <div className="col-span-1" /> {/* NOW overlays here via absolute */}
            <div className="col-span-1 pt-12">
              <PlanCard plan={futurePlans[3]} idx={3} color={categoryColor[futurePlans[3].category] || categoryColor['职业']} />
            </div>
          </div>

          {/* Mobile stacked layout */}
          <div className="md:hidden flex flex-col gap-4">
            {futurePlans.map((plan, idx) => {
              const color = categoryColor[plan.category] || categoryColor['职业'];
              return <PlanCard key={plan.id} plan={plan} idx={idx} color={color} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
