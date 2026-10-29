import { personalInfo } from '../data';

interface FooterProps {
  onContactMe: () => void;
}

export default function Footer({ onContactMe }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="nb-footer">
      <div className="nb-footer-inner">
        <div className="nb-footer-brand">
          <span className="nb-footer-mark">JY.LU</span>
          <span>© {currentYear} 陆机阳 · 保留所有权利</span>
        </div>

        <div className="nb-footer-meta">
          <span>暨南大学金融工程 · AI 运营创新</span>
          <button type="button" className="nb-footer-email" onClick={onContactMe}>
            {personalInfo.email}
          </button>
        </div>
      </div>
    </footer>
  );
}
