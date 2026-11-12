import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Accessible image lightbox modal supporting Escape key, arrow navigation,
 * and backdrop dismissal.
 */
export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const isOpen = activeIndex !== null && images[activeIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const current = images[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${current.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#140E0B]/92 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFFDF9]/20 bg-[#241A16]/80 text-[#FFFDF9] transition-colors hover:bg-[#B66A45]"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous gallery image"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFFDF9]/20 bg-[#241A16]/80 text-[#FFFDF9] transition-colors hover:bg-[#B66A45] sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next gallery image"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFFDF9]/20 bg-[#241A16]/80 text-[#FFFDF9] transition-colors hover:bg-[#B66A45] sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <figure
        className="relative flex max-h-[85vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.alt}
          className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 flex flex-col items-center gap-1 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#D6926F] uppercase">
            {current.category} · {activeIndex + 1} / {images.length}
          </span>
          <p className="font-serif text-lg text-[#FFFDF9]">{current.caption}</p>
        </figcaption>
      </figure>
    </div>
  );
}
