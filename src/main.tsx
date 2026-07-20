import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { experiences } from './data';
import './netease-experience-2026';
import './index.css'; import './layout-fixes.css'; import './cutout.css'; import './final-fixes.css'; import './color-fixes.css'; import './about-cutout.css'; import './contact-dark.css'; import './contact-emoji.css'; import './portfolio.css'; import './light-theme.css'; import './portfolio-book.css'; import './portfolio-photos.css'; import './projects-dark.css'; import './photography-clean.css'; import './portfolio-grid.css'; import './editing-subcategories.css'; import './editing-links.css'; import './editing-videos.css'; import './operation-cards.css'; import './closing-page.css'; import './netease-role-fix.css'; import './projects-scroll.css';
const growthInternship = experiences.find((experience) => experience.id === 'exp-qy');
if (growthInternship) growthInternship.role = '用户增长实习生';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
