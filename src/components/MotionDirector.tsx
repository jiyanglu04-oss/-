import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionDirector() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set('[data-reveal]', { clearProps: 'all' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('.hero-eyebrow', { y: 18, autoAlpha: 0, duration: 0.55 })
      .from('.hero-word', { yPercent: 115, rotate: 2, duration: 0.95, stagger: 0.08 }, '-=0.25')
      .from('.hero-intro-copy, .hero-actions', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, '-=0.48')
      .from('.hero-portrait-wrap', { y: 60, scale: 0.94, autoAlpha: 0, duration: 1 }, '-=0.85');

    gsap.to('.hero-portrait', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 42,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready.then(refresh);

    return () => window.removeEventListener('load', refresh);
  });

  return <div ref={progressRef} className="reading-progress" aria-hidden="true" />;
}
