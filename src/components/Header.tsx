import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onContactMe: () => void;
}

const navItems = [
  { label: '关于', id: 'about' },
  { label: '经历', id: 'experience' },
  { label: '项目', id: 'projects' },
  { label: '作品集', id: 'portfolio' },
  { label: '优势', id: 'advantages' },
  { label: '规划', id: 'future-plan' },
];

export default function Header({ activeSection, onContactMe }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="nb-header">
      <div className="nb-nav">
        <button className="nb-wordmark" onClick={() => scrollToSection('home')} aria-label="返回首页">
          <span className="nb-wordmark-mark" aria-hidden="true">
            JY
          </span>
          <span className="nb-wordmark-text">陆机阳</span>
        </button>

        <nav className="nb-nav-links" aria-label="主导航">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`nb-nav-link${activeSection === item.id ? ' is-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="nb-contact-btn" onClick={onContactMe}>
          联系我 <ArrowUpRight aria-hidden="true" />
        </button>

        <button
          type="button"
          className="nb-menu-toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? '关闭导航' : '打开导航'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <nav className="nb-mobile-nav" aria-label="移动端主导航">
          {navItems.map((item) => (
            <button key={item.id} type="button" className="nb-mobile-link" onClick={() => scrollToSection(item.id)}>
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
