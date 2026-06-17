import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Advantages from './components/Advantages';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import FuturePlan from './components/FuturePlan';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'advantages', 'future-plan', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // offset to pick upper section
      
      // Special check for bottom of page to auto-activate contact section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to capture current view
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // matches header capsule offset
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
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans antialiased selection:bg-brand-200 selection:text-slate-900">
      {/* Dynamic Header */}
      <Header activeSection={activeSection} />

      {/* Main Orchestrations */}
      <main>
        {/* HERO LANDING GROUP */}
        <Hero 
          onViewProjects={() => handleScrollToSection('projects')}
          onContactMe={() => handleScrollToSection('contact')}
        />

        {/* ABOUT ME SECTION */}
        <About />

        {/* EXPERIENCE TIMELINE TABS */}
        <ExperienceTimeline />

        {/* PROJECTS */}
        <Projects />

        {/* ADVANTAGES & SKILLS ASSESSMENTS */}
        <Advantages />

        {/* FUTURE PLAN */}
        <FuturePlan />

        {/* RECRUITMENT CONTACT ME */}
        <Contact />
      </main>

      {/* FOOTER COLLATERAL */}
      <Footer />
    </div>
  );
}
