import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Trophy, ShoppingBag, HelpCircle } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: '全部项目', id: 'all' },
    { label: 'AI智能体', id: 'AI智能' },
    { label: '量化与调研', id: '竞技' },
    { label: '自媒体流量', id: '新媒体' },
    { label: '跨境店创业', id: '创业' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Selector for cards visual graphics
  const getProjectGraphic = (project: Project) => {
    switch (project.category) {
      case 'AI智能':
        return (
          <div className="absolute inset-0 flex items-center justify-center border-b border-slate-200 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}yaoshan-cover.png`} alt="药膳智环" className="w-full h-full object-cover" />
          </div>
        );
      case '竞技':
        return (
          <div className="absolute inset-0 flex items-center justify-center border-b border-slate-200 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}zhengda-cover.png`} alt="正大杯调研" className="w-full h-full object-cover" />
          </div>
        );
      case '创业':
        return (
          <div className="absolute inset-0 flex items-center justify-center border-b border-slate-200 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}shopee-store.png`} alt="Shopee店铺" className="w-full h-full object-cover" />
          </div>
        );
      case '新媒体':
        return (
          <div className="absolute inset-0 flex items-center justify-center border-b border-slate-200 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}xhs-profile.jpg`} alt="小红书主页" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center border-b border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-400" />
          </div>
        );
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background radial effects */}
      <div className="absolute right-[-10%] top-[40%] w-[450px] h-[450px] bg-brand-200/25 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] top-[10%] w-[350px] h-[350px] bg-brand-200/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-3.5 py-1 rounded-full bg-white border border-slate-900/20 text-slate-700 text-xs font-semibold tracking-wider mb-3 uppercase">
            Some of my recent work / 实践项目展示
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative">
            我的项目经历
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </h2>
        </div>

        {/* Categories Tab Filter capsules */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={isActive ? { scale: 1.05 } : { scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider border cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Project Grid with Framer Motion Layout animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-slate-200 hover:border-slate-900/15 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Visual Header / Graphic Card */}
                <div className="relative aspect-[16/9] w-full bg-white overflow-hidden">
                  {getProjectGraphic(project)}
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-700 tracking-widest uppercase">
                    {project.category}
                  </div>

                  {/* Award tag */}
                  {project.award && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-900 text-[10px] font-bold text-white tracking-wide shadow-sm">
                      <Trophy className="w-3 h-3" />
                      <span>{project.award}</span>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role Title */}
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2 font-semibold">
                      {project.role} · {project.period}
                    </p>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-900 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Bullet description */}
                    <ul className="space-y-3.5">
                      {project.description.map((desc, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-relaxed font-normal flex items-start gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-slate-900 shrink-0 mt-2" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags and Action row */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons matching the style precisely */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 font-mono">
                        {project.impact ? `⭐ ${project.impact}` : ''}
                      </span>
                      <a
                        href={project.link || '#contact'}
                        target={project.link ? '_blank' : undefined}
                        rel={project.link ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-1 bg-slate-900 text-white font-semibold text-xs px-4.5 py-2.5 rounded-full shadow-sm hover:bg-slate-800 transition-all duration-200 whitespace-nowrap"
                      >
                        <span>{project.actionLabel || '咨询细节'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
