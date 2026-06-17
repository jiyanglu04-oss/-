import { motion } from 'motion/react';
import { Mail, GraduationCap, MapPin, Sparkles, Download, FileText } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-brand-200/40 blur-[90px] pointer-events-none" />
      <div className="absolute left-[-5%] bottom-10 w-[300px] h-[300px] rounded-full bg-brand-200/30 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-3.5 py-1 rounded-full bg-white border border-slate-900/20 text-slate-700 text-xs font-semibold tracking-wider mb-3 uppercase">
            My Background / 我的简介
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative">
            关于我
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </h2>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Avatar Card with Special SVG Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative group flex-1 rounded-3xl bg-white p-4 border border-slate-200 flex flex-col justify-between overflow-hidden shadow-sm">
              {/* Image / Aesthetic SVG Vector Block */}
              <motion.div
                className="relative aspect-square md:aspect-auto md:h-[340px] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <motion.img
                  src={`${import.meta.env.BASE_URL}avatar.jpg`}
                  alt="头像"
                  className="w-full h-full object-cover rounded-2xl"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                />

                {/* Aesthetic hover card gloss */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-brand-500/0 via-brand-400/10 to-brand-400/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Border glow ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-brand-400/0"
                  whileHover={{ borderColor: 'rgba(56,189,248,0.5)' }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>

              {/* Footer */}
              <div className="pt-4 pb-2 px-2 flex items-center justify-start">
                <span className="font-medium" style={{ fontSize: '18px', color: 'oklch(0.704 0.04 256.788)' }}>
                  陆机阳 Jackson Lu
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Textual Journey Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Bio Glassmorphic Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                  <span>产品经理和运营的探索者</span>
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Personal details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-brand-600">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-medium">教育背景 / 专业</h4>
                    <p className="text-sm text-slate-900 font-semibold mt-1">{personalInfo.university}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{personalInfo.major}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-brand-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-medium">联络邮箱</h4>
                    <p className="text-sm text-slate-900 font-semibold mt-1 hover:text-brand-700 transition-colors">
                      <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-brand-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-medium">当前所在地</h4>
                    <p className="text-sm text-slate-900 font-semibold mt-1">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-brand-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-medium">职业状态</h4>
                    <p className="text-sm text-brand-400 font-semibold mt-1">开放商业合作与企业实习</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const offset = 90;
                      const offsetPosition = elementRect - bodyRect - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(15,23,42,0.25)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white border border-slate-900 rounded-2xl text-sm font-semibold cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-brand-400" />
                  <span>与我深入交流</span>
                </motion.button>
                <motion.a 
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', backgroundColor: '#f8fafc' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-300 rounded-2xl text-sm font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4 text-brand-400" />
                  <span>看看我的简历</span>
                </motion.a>
                <span className="text-sm text-slate-400 font-medium ml-auto">Jackson Lu</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
