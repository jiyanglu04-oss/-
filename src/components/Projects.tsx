import { MouseEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';

const categories = [
  { label: '全部', id: 'all' }, { label: 'AI 智能', id: 'AI智能' },
  { label: '调研竞技', id: '竞技' }, { label: '自媒体', id: '新媒体' }, { label: '创业', id: '创业' },
];

const coverFor = (project: Project) => ({
  AI智能: 'yaoshan-cover.png', 竞技: 'zhengda-cover.png', 创业: 'shopee-store.png', 新媒体: 'xhs-profile.jpg',
}[project.category] || 'avatar.jpg');

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const stripRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const filtered = selectedCategory === 'all' ? projects : projects.filter((item) => item.category === selectedCategory);

  const choose = (id: string) => {
    setSelectedCategory(id);
    stripRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const startDrag = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const strip = stripRef.current;
    if (!strip) return;
    dragState.current = { active: true, startX: event.clientX, startScroll: strip.scrollLeft, moved: false };
    strip.classList.add('is-dragging');
    event.preventDefault();
  };

  const moveDrag = (event: MouseEvent<HTMLDivElement>) => {
    const strip = stripRef.current;
    if (!strip || !dragState.current.active) return;
    const distance = event.clientX - dragState.current.startX;
    if (Math.abs(distance) > 5) dragState.current.moved = true;
    strip.scrollLeft = dragState.current.startScroll - distance;
  };

  const endDrag = () => {
    const strip = stripRef.current;
    if (!strip || !dragState.current.active) return;
    dragState.current.active = false;
    strip.classList.remove('is-dragging');
  };

  return (
    <section id="projects" className="editorial-projects">
      <div className="projects-head">
        <div><div className="section-kicker light">/ SELECTED WORK</div><h2>研究与项目</h2></div>
        <div className="project-drag-hint" aria-hidden="true"><span>拖动浏览</span><i>↔</i></div>
      </div>
      <div className="project-filters">
        {categories.map((item) => <button key={item.id} onClick={() => choose(item.id)} className={selectedCategory === item.id ? 'active' : ''}>{item.label}</button>)}
      </div>
      <motion.div
        ref={stripRef}
        layout
        className="project-strip project-strip-scroll"
        onMouseDown={startDrag}
        onMouseMove={moveDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onClickCapture={(event) => {
          if (dragState.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            dragState.current.moved = false;
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.article layout initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key={project.id} className="project-poster" onDragStart={(event) => event.preventDefault()}>
              <img src={`${import.meta.env.BASE_URL}${coverFor(project)}`} alt={project.title} draggable="false" />
              <div className="poster-shade" />
              <div className="poster-number">0{index + 1}</div>
              {project.award && <div className="poster-award"><Trophy /> {project.award}</div>}
              <div className="poster-copy">
                <small>{project.category} · {project.period}</small>
                <h3>{project.title}</h3>
                <p>{project.description[0]}</p>
                <div className="poster-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <a href={project.link || 'mailto:1346514923@qq.com'} target={project.link ? '_blank' : undefined} rel="noreferrer" aria-label={project.actionLabel}><ArrowUpRight /></a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="projects-note">按住项目区域左右拖动浏览；触控板与手机也可直接横向滑动。</div>
    </section>
  );
}
