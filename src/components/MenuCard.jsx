/**
 * Reusable menu card displaying photography, dietary indicator, bestseller badge,
 * item description, and formatted INR price.
 */
export default function MenuCard({ item }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#2C211B]/8 bg-[var(--color-bg-secondary)] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE1D5]">
        <img
          src={item.image}
          alt={item.imageAlt || item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item.isBestseller && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#FFFDF9] uppercase shadow-xs">
            Bestseller
          </span>
        )}

        <span className="absolute right-3 bottom-3 rounded-full bg-[#241A16]/80 px-2.5 py-1 text-[11px] font-medium text-[#F8F3EA] backdrop-blur-xs">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              {item.isVeg !== undefined && (
                <span
                  title={item.isVeg ? 'Vegetarian' : 'Contains Non-Vegetarian Ingredients'}
                  aria-label={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                  className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                    item.isVeg ? 'border-emerald-700' : 'border-rose-700'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.isVeg ? 'bg-emerald-700' : 'bg-rose-700'
                    }`}
                  />
                </span>
              )}
              <h3 className="font-serif text-xl font-semibold text-[var(--color-text-primary)]">
                {item.name}
              </h3>
            </div>
            <span className="shrink-0 font-sans text-base font-semibold text-[var(--color-accent)]">
              ₹{item.price}
            </span>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {item.description}
          </p>
        </div>

        {item.dietaryNote && (
          <p className="mt-4 border-t border-[#2C211B]/8 pt-3 text-xs font-medium text-[var(--color-text-secondary)]">
            {item.dietaryNote}
          </p>
        )}
      </div>
    </article>
  );
}
