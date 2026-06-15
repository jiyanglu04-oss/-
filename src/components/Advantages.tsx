import { motion } from 'motion/react';
import { Sparkles, BarChart3, Video, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';
import { skillCategories, personalInfo } from '../data';

export default function Advantages() {
  // Safe helper to render icons dynamically
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-brand-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-brand-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-brand-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-900" />;
    }
  };

  return (
    <section 
      id="advantages" 
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute left-[15%] top-1/3 w-[350px] h-[350px] rounded-full bg-brand-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute right-[5%] bottom-1/4 w-[250px] h-[250px] rounded-full bg-brand-200/25 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-3.5 py-1 rounded-full bg-white border border-slate-900/20 text-slate-700 text-xs font-semibold tracking-wider mb-3 uppercase">
            My Strengths / 我的优势
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative">
            我的技术与竞争优势
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </h2>
        </div>

        {/* Bento Grid layout of strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Attributes summaries (0-1 deployment, executed) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -3, boxShadow: '0 12px 28px rgba(14,165,233,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-4 flex flex-col justify-between rounded-3xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden cursor-default"
          >
            {/* Background pattern mask */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-tr from-brand-500/10 to-transparent blur-xl" />
            
            <div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-brand-600 w-fit mb-6">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">核心个人特质总结</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                自媒体创作与运营、Vibe Coding项目，项目运营和产品思维
              </p>
            </div>

            <div className="space-y-4">
              {personalInfo.advantages.map((adv, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600 leading-relaxed font-medium">{adv}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Three skill segments with specific ratings */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-1 gap-6">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3, boxShadow: '0 12px 28px rgba(14,165,233,0.1)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl bg-white border border-slate-200 p-6 hover:border-brand-500/25 shadow-sm cursor-default"
              >
                <div className="flex items-center gap-4.5 mb-6 border-b border-slate-200 pb-4">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-wide">{cat.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{cat.description}</p>
                  </div>
                </div>

                {/* Sub skill items */}
                <div className="space-y-5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="group">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">{item.name}</span>

                      {/* Description footnote */}
                      {item.details && (
                        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 leading-relaxed font-medium">
                          <ChevronRight className="w-3 h-3 text-brand-500/50 shrink-0" />
                          <span>{item.details}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fun Stats Row to prove capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
          {[
            { metric: '150w+', label: '小红书总曝光量' },
            { metric: '100+', label: '电商SKU上架' },
            { metric: '10万+', label: '新媒体实习直接推动营收' },
            { metric: '6场', label: '百人级品牌活动策划' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, y: -4, boxShadow: '0 12px 28px rgba(14,165,233,0.12)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-default"
            >
              <h4 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-600">
                {stat.metric}
              </h4>
              <p className="text-xs text-slate-600 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
