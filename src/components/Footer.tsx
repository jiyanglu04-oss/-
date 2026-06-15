import { personalInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-slate-50 border-t border-slate-200 relative overflow-hidden text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left trademark */}
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-600 tracking-wide text-sm">
            JY.LU
          </span>
          <span className="text-slate-400 font-semibold">|</span>
          <span>© {currentYear} 陆机阳. 保留所有权利.</span>
        </div>

        {/* Right sublink / email quick view */}
        <div className="flex items-center gap-4">
          <span>暨南大学金融工程 · AI运营创新</span>
          <span className="text-slate-400">|</span>
          <a href={`mailto:${personalInfo.email}`} className="hover:text-brand-700 transition-colors">
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
