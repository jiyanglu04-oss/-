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
import MotionDirector from './components/MotionDirector';
import TiltDirector from './components/TiltDirector';
import ContactCardModal from './components/ContactCardModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'portfolio', 'advantages', 'future-plan', 'closing'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const openContactCard = () => setIsContactOpen(true);

  return (
    <div className="site-shell">
      <MotionDirector />
      <TiltDirector />
      <Header activeSection={activeSection} onContactMe={openContactCard} />
      <main>
        <Hero onViewProjects={() => scrollTo('projects')} onContactMe={openContactCard} />
        <About onContactMe={openContactCard} />
        <ExperienceTimeline />
        <Projects />
        <Portfolio onContactMe={openContactCard} />
        <Advantages />
        <FuturePlan />
        <ClosingPage onContactMe={openContactCard} />
      </main>
      <Footer onContactMe={openContactCard} />
      <ContactCardModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
