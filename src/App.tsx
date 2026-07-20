import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Advantages from './components/Advantages';
import Projects from './components/Projects';
import Portfolio from './components/Portfolio';
import ExperienceTimeline from './components/ExperienceTimeline';
import FuturePlan from './components/FuturePlan';
import ClosingPage from './components/ClosingPage';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'portfolio', 'advantages', 'future-plan', 'closing'];
    const handleScroll = () => {
      const current = sections.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const emailMe = () => { window.location.href = 'mailto:1346514923@qq.com'; };

  return (
    <div className="site-shell">
      <Header activeSection={activeSection} />
      <main>
        <Hero onViewProjects={() => scrollTo('projects')} onContactMe={emailMe} />
        <About />
        <ExperienceTimeline />
        <Projects />
        <Portfolio />
        <Advantages />
        <FuturePlan />
        <ClosingPage onEmail={emailMe} />
      </main>
      <Footer />
    </div>
  );
}
