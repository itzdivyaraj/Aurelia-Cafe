import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function PrivacyModal({ isOpen, onClose }) {
  const { business, contact } = useSiteConfig();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#140E0B]/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#2C211B]/12 bg-[var(--color-bg-secondary)] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#2C211B]/10 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
              Legal &amp; Data Notice
            </p>
            <h2
              id="privacy-modal-title"
              className="mt-1 font-serif text-2xl font-semibold text-[var(--color-text-primary)]"
            >
              Privacy Policy
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C211B]/12 text-[var(--color-text-primary)] hover:bg-[#2C211B]/8"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <p>
            <strong className="text-[var(--color-text-primary)]">{business.name}</strong> respects
            your privacy. Any details submitted through our table reservation or enquiry form
            (such as your name, phone number, email address, and event preferences) are used
            solely to respond to your booking or enquiry.
          </p>
          <p>
            When this website is running in frontend demo mode without a configured API endpoint,
            form entries remain strictly in your browser and are not transmitted or stored on any
            server.
          </p>
          <p>
            External links such as Google Maps, Instagram, and WhatsApp are governed by the
            privacy policies of their respective platforms.
          </p>
          <p>
            For questions regarding your data or reservations, please contact us at{' '}
            <a
              href={`mailto:${contact.email}`}
              className="font-medium text-[var(--color-accent)] underline underline-offset-2"
            >
              {contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
