/**
 * Consistent editorial section heading with eyebrow label, serif title, and optional subtitle.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={`${
        isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'
      }`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.22em] uppercase ${
            dark ? 'text-[#D6926F]' : 'text-[var(--color-accent)]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.65rem] ${
          dark ? 'text-[#FFFDF9]' : 'text-[var(--color-text-primary)]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-[#D9CEC4]' : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
