import { useSiteConfig } from '../context/SiteConfigContext';

export default function WhatsAppButton() {
  const { contact } = useSiteConfig();

  if (!contact?.whatsappNumber) return null;

  const cleanNumber = contact.whatsappNumber.replace(/[^\d]/g, '');
  const message =
    contact.whatsappMessage ||
    'Hello! I visited your website and would like to know more about your café.';
  const href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#FFFDF9]/80 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl sm:right-7 sm:bottom-7"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6"
      >
        <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.256.588 4.462 1.704 6.404L3.2 28.8l6.548-1.676a12.747 12.747 0 0 0 6.256 1.636h.004c7.064 0 12.796-5.732 12.796-12.8s-5.736-12.76-12.8-12.76Zm7.452 18.084c-.312.88-1.824 1.68-2.52 1.784-.644.096-1.46.136-2.356-.148-.544-.172-1.244-.404-2.14-.792-3.764-1.624-6.224-5.412-6.412-5.664-.188-.252-1.532-2.04-1.532-3.892 0-1.852.968-2.76 1.312-3.136.344-.376.752-.472 1-.472.252 0 .5.004.72.012.232.012.544-.088.852.648.312.752 1.064 2.604 1.156 2.792.096.188.156.408.032.66-.124.252-.188.408-.376.628-.188.22-.396.492-.564.66-.188.188-.384.392-.164.768.22.376.976 1.612 2.096 2.608 1.44 1.284 2.652 1.684 3.028 1.872.376.188.596.156.816-.096.22-.252.94-1.096 1.192-1.472.252-.376.5-.312.844-.188.344.124 2.192 1.032 2.568 1.22.376.188.628.284.72.44.092.156.092.908-.22 1.788Z" />
      </svg>
    </a>
  );
}
