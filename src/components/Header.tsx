import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首页', id: 'home' },
    { label: '关于我', id: 'about' },
    { label: '实习与时间线', id: 'experience' },
    { label: '项目经历', id: 'projects' },
    { label: '我的优势', id: 'advantages' },
    { label: '未来规划', id: 'future-plan' },
    { label: '联系方式', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-2 border-slate-900/80 shadow-sm' 
            : 'bg-white/90 backdrop-blur-sm border-2 border-slate-900/80'
        }`}
      >
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <span className="font-display font-bold text-xl tracking-wider text-slate-900 flex items-center">
            <span>JY</span>
            <span className="text-slate-900/70 font-normal">.LU</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={isActive ? {} : { scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Resume Button */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 20px rgba(15,23,42,0.25)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 bg-slate-900 text-white font-medium text-xs px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
          >
            <span>预约面谈</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-6 shadow-lg lg:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-left transition-all ${
                      isActive 
                        ? 'bg-slate-900 text-white border border-slate-900 font-semibold' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-900/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  </motion.button>
                );
              })}
            </div>
            
            <hr className="border-slate-200 my-1" />
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(15,23,42,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-medium py-3.5 rounded-xl shadow-sm text-center cursor-pointer"
            >
              <span>预约面谈</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
