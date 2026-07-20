import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data';

interface HeaderProps { activeSection: string; }

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const navItems = [
    { label: '关于', id: 'about' }, { label: '经历', id: 'experience' },
    { label: '项目', id: 'projects' }, { label: '作品集', id: 'portfolio' },
    { label: '优势', id: 'advantages' }, { label: '规划', id: 'future-plan' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="editorial-header">
      <div className="editorial-nav">
        <button className="wordmark" onClick={() => scrollToSection('home')} aria-label="返回首页">
          <span>Ji</span><i>y</i><span>ang</span><b>.</b>
        </button>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={activeSection === item.id ? 'active' : ''}>{item.label}</button>
          ))}
        </nav>
        <div className="nav-tools">
          <span className="time-chip">☼&nbsp; {time}</span>
          <span className="lang-chip">中</span>
          <a className="email-button" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </div>
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">{isOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mobile-nav">
            {navItems.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}</button>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
