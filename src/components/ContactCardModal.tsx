import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Mail, Phone, X } from 'lucide-react';
import { personalInfo } from '../data';

interface ContactCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactCardModal({ isOpen, onClose }: ContactCardModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('contact-modal-open');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]'),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('contact-modal-open');
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="contact-modal-backdrop"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="contact-card-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-card-title"
        aria-describedby="contact-card-message"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label="关闭联系卡片"
        >
          <X aria-hidden="true" />
        </button>

        <div className="contact-card-portrait">
          <img
            src={`${import.meta.env.BASE_URL}contact-work-portrait.webp`}
            alt="陆机阳在电脑前创作的手绘肖像"
          />
        </div>

        <div className="contact-card-copy">
          <p className="contact-card-kicker">LET&apos;S TALK</p>
          <h2 id="contact-card-title">一起聊聊吧，我很期待我们之间产生的火花！</h2>
          <p id="contact-card-message" className="contact-card-name">
            <strong>{personalInfo.name}</strong>
            <span>{personalInfo.pinyin}</span>
          </p>

          <div className="contact-card-details">
            <a href={`tel:${personalInfo.phone}`}>
              <span className="contact-card-detail-icon"><Phone aria-hidden="true" /></span>
              <span><small>手机 / 微信</small><strong>{personalInfo.phone}</strong></span>
            </a>
            <a href={`mailto:${personalInfo.email}`}>
              <span className="contact-card-detail-icon"><Mail aria-hidden="true" /></span>
              <span><small>邮箱</small><strong>{personalInfo.email}</strong></span>
            </a>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
