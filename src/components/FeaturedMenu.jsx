import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import MenuCard from './MenuCard';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function FeaturedMenu({ activeCategory, onCategoryChange }) {
  const { menu } = useSiteConfig();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const categories = menu.categories;

  const filteredItems = useMemo(() => {
    const baseItems = menu.items.filter((item) => item.featured !== false);
    if (activeCategory === 'All') return baseItems;
    return baseItems.filter((item) => item.category === activeCategory);
  }, [menu.items, activeCategory]);

  const fullMenuItems = useMemo(() => {
    return menu.items.filter((item) => {
      if (vegOnly && !item.isVeg) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [menu.items, vegOnly, searchQuery]);

  const groupedFullMenu = useMemo(() => {
    const groups = {};
    categories
      .filter((c) => c !== 'All')
      .forEach((cat) => {
        const items = fullMenuItems.filter((i) => i.category === cat);
        if (items.length > 0) groups[cat] = items;
      });
    return groups;
  }, [categories, fullMenuItems]);

  useEffect(() => {
    if (!isFullMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFullMenuOpen]);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-[var(--color-bg-primary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div id="menu-heading">
            <SectionHeader
              eyebrow={menu.eyebrow}
              title={menu.title}
              description={menu.description}
            />
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => onCategoryChange(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-[var(--color-dark-surface)] text-[#FFFDF9] shadow-sm'
                    : 'border border-[#2C211B]/12 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
            No items found in this category.
          </p>
        )}

        {/* View Full Menu CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setIsFullMenuOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-dark-surface)] bg-transparent px-8 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:bg-[var(--color-dark-surface)] hover:text-[#FFFDF9]"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{menu.fullMenuCtaLabel || 'View Full Menu'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Full Menu Modal */}
      {isFullMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="full-menu-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A120E]/70 p-4 backdrop-blur-xs"
          onClick={() => setIsFullMenuOpen(false)}
        >
          <div
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#2C211B]/12 bg-[var(--color-bg-primary)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#2C211B]/10 bg-[var(--color-bg-secondary)] px-6 py-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                  Complete Kitchen &amp; Bar
                </p>
                <h3
                  id="full-menu-modal-title"
                  className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]"
                >
                  Full Café Menu
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFullMenuOpen(false)}
                aria-label="Close full menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2C211B]/12 text-[var(--color-text-primary)] transition-colors hover:bg-[#2C211B]/8"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search & Veg Filter Bar */}
            <div className="flex flex-col gap-3 border-b border-[#2C211B]/10 bg-[var(--color-bg-secondary)]/70 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coffee, sourdough, desserts..."
                  aria-label="Search full menu"
                  className="w-full rounded-full border border-[#2C211B]/15 bg-[var(--color-bg-secondary)] py-2 pr-4 pl-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/70"
                />
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2.5 self-start rounded-full border border-[#2C211B]/12 bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] sm:self-auto">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="h-4 w-4 accent-emerald-700"
                />
                <span>Pure Veg Only</span>
              </label>
            </div>

            {/* Scrollable Menu List */}
            <div className="overflow-y-auto px-6 py-6">
              {Object.keys(groupedFullMenu).length === 0 ? (
                <p className="py-12 text-center text-sm text-[var(--color-text-secondary)]">
                  No menu items match your filter. Try clearing the search box.
                </p>
              ) : (
                <div className="space-y-9">
                  {Object.entries(groupedFullMenu).map(([categoryName, items]) => (
                    <div key={categoryName}>
                      <h4 className="border-b border-[#2C211B]/12 pb-2 font-serif text-xl font-semibold text-[var(--color-text-primary)]">
                        {categoryName}
                      </h4>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between gap-4 rounded-2xl border border-[#2C211B]/8 bg-[var(--color-bg-secondary)] p-4"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  aria-label={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                                  className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border ${
                                    item.isVeg ? 'border-emerald-700' : 'border-rose-700'
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      item.isVeg ? 'bg-emerald-700' : 'bg-rose-700'
                                    }`}
                                  />
                                </span>
                                <p className="font-serif text-base font-semibold text-[var(--color-text-primary)]">
                                  {item.name}
                                </p>
                                {item.isBestseller && (
                                  <span className="rounded-full bg-[var(--color-accent)]/12 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-accent)] uppercase">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                                {item.description}
                              </p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold text-[var(--color-accent)]">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
