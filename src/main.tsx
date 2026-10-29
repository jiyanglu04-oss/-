import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { experiences } from './data';
import './netease-experience-2026';
import './oppo-experience-2026';
/* 样式导入顺序：基础层 → 主题层（主题层必须最后，保证优先级最高） */
import './index.css';
import './neo-brutalism.css';

const growthInternship = experiences.find((experience) => experience.id === 'exp-qy');
if (growthInternship) growthInternship.role = '用户增长实习生';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
