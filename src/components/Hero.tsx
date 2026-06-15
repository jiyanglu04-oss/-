import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Github, Laptop } from 'lucide-react';
import { personalInfo } from '../data';
import JacksonText from './JacksonText';
import './Hero.css';

interface HeroProps {
  onViewProjects: () => void;
  onContactMe: () => void;
}

export default function Hero({ onViewProjects, onContactMe }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-slate-50 pt-24 overflow-hidden"
    >
      {/* Background Radial Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-brand-200/25 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content Block */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Top Pill Bagde */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(14,165,233,0.2)' }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200 text-brand-600 text-xs font-semibold tracking-wide mb-6 shadow-sm cursor-default"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>暨南大学金融工程</span>
            <span className="text-brand-500/50">|</span>
            <Laptop className="w-3.5 h-3.5" />
            <span>想要做产品的一名大学生</span>
          </motion.div>

          {/* Intro Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-slate-900 mb-2 leading-tight cursor-default"
          >
            你好，我是 <br />
            <span className="hero-name text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-600 leading-normal hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] transition-all duration-300">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Detailed Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ color: '#1e293b', x: 4 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mb-8 cursor-default"
          >
            我致力于运用我现有以及正在学习的产品和运营思维赋能工作，并且尝试用AI实现自己的ideas，AI平台，小红书创作运营，电商运营，新媒体运营，产品经理等岗位都是我正在摸索与学习的领域，欢迎和我交流
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <motion.button
              onClick={onViewProjects}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14,165,233,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-400 to-brand-600 text-white font-semibold text-sm px-7 py-4 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.25)] cursor-pointer"
            >
              <span>看看我的项目</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={onContactMe}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-semibold text-sm px-7 py-4 rounded-full cursor-pointer shadow-sm"
            >
              <span>联系我 / 预约面谈</span>
            </motion.button>
          </motion.div>

        </div>

        {/* Jackson interactive text on the right */}
        <div className="hidden lg:flex lg:col-span-6 items-center justify-center">
          <JacksonText />
        </div>
      </div>

      {/* Mouse Icon - Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2.5 z-10 pointer-events-none">
        <div className="w-5 h-8.5 rounded-full border-2 border-slate-300 flex justify-center p-1.5">
          <motion.div 
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-brand-500 rounded-full" 
          />
        </div>
      </div>
    </section>
  );
}
