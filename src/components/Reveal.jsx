import { useReveal } from '../hooks/useReveal';

/**
 * Reusable scroll-reveal wrapper using Intersection Observer.
 */
export default function Reveal({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal-element ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
