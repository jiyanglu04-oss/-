import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Calendar, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Camera, 
  Trophy, 
  Award,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { experiences, timelineEvents } from '../data';
import { TimelineEvent } from '../types';

export default function ExperienceTimeline() {
  const [viewTab, setViewTab] = useState<'timeline' | 'internship'>('internship');

  // Helper to resolve timeline icon dynamically
  const getTimelineIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-brand-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-brand-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-brand-400" />;
      case 'Trophy':
        return <Trophy className="w-4 h-4 text-brand-400" />;
      case 'Award':
        return <Award className="w-4 h-4 text-brand-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-brand-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section 
      id="experience" 
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute left-[20%] top-[40%] w-[400px] h-[400px] bg-brand-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute right-[5%] top-[10%] w-[300px] h-[300px] bg-brand-200/25 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold tracking-wider mb-3 uppercase">
            My Professional Journey / 实践与时间线
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative">
            我的经历与成长轨迹
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </h2>
        </div>

        {/* Dynamic Nav Switcher */}
        <div className="flex items-center justify-center mb-14">
          <div className="p-1 bg-slate-100 rounded-full border border-slate-200 flex gap-1">
            <button
              onClick={() => setViewTab('internship')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'internship'
                  ? 'bg-gradient-to-r from-brand-400 to-brand-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>实习及岗位经历</span>
            </button>
            <button
              onClick={() => setViewTab('timeline')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'timeline'
                  ? 'bg-gradient-to-r from-brand-400 to-brand-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>成长里程成长线</span>
            </button>
          </div>
        </div>

        {/* TABS CONTAINER */}
        <div className="relative min-h-[500px]">
          {/* TAB 1: Internship experiences */}
          {viewTab === 'internship' ? (
            <div className="flex flex-col gap-10">
              {experiences.map((exp, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  key={exp.id}
                  className="rounded-3xl bg-white border border-slate-200 p-8 hover:border-brand-300 hover:shadow-lg shadow-sm transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-brand-200/40 to-transparent blur-2xl" />
                  
                  {/* Top line with company, role & metadata */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-medium text-brand-600 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{exp.role}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 font-mono self-start md:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Bullet Achievements items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                        <h4 className="text-sm font-bold text-slate-800 mb-2 pb-1.5 border-b border-slate-200 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                          <span>{bullet.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {bullet.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Impact bottom tag */}
                  {exp.impact && (
                    <div className="mt-2 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                        MILESTONE & VALUE GENERATED
                      </span>
                      <div className="px-4.5 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold tracking-wide flex items-center gap-1.5 w-fit">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                        <span>项目收益：{exp.impact}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            // TAB 2: Growth Timeline with specific design (matching Screenshot 4)
            <div className="relative max-w-4xl mx-auto">
              
              {/* Central vertical timeline high-contrast line */}
              <div className="absolute left-[24px] md:left-1/2 md:transform md:-translate-x-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 opacity-30" />

              <div className="space-y-12">
                {timelineEvents.map((event, idx) => {
                  const isLeft = idx % 2 === 0;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10px' }}
                      transition={{ duration: 0.5 }}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isLeft ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* 1. Bullet icon aligned on timeline */}
                      <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-1.5 z-20">
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center shadow-[0_0_10px_rgba(14,165,233,0.35)]">
                          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                        </div>
                      </div>

                      {/* 2. Horizontal timeline layout spacer / card column */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all duration-300 relative group overflow-hidden">
                          {/* Top background glow line */}
                          <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-brand-400 to-brand-600 opacity-60" />

                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            {/* Icon / category tag */}
                            <div className="flex items-center gap-2 font-semibold">
                              <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
                                {getTimelineIcon(event.iconName)}
                              </div>
                              <span className="text-xs text-slate-500 font-mono tracking-wider font-semibold">
                                {event.subtitle}
                              </span>
                            </div>

                            {/* Date Badge */}
                            <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 font-semibold text-[10px] uppercase font-mono tracking-wider">
                              {event.date}
                            </span>
                          </div>

                          {/* Titles */}
                          <h4 className="text-base font-bold text-slate-900 mb-2 tracking-wide group-hover:text-brand-600 transition-colors">
                            {event.title}
                          </h4>

                          {/* Decriptions */}
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Empty column on other side of timeline to balance layout */}
                      <div className="hidden md:block w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
