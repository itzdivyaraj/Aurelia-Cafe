import {
  ChefHat,
  Coffee,
  HeartHandshake,
  Laptop,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const FEATURE_ICONS = {
  fresh: ChefHat,
  ingredients: Sparkles,
  atmosphere: Sun,
  service: HeartHandshake,
  coffee: Coffee,
  space: Laptop,
};

export default function WhyChooseUs() {
  const { whyChooseUs } = useSiteConfig();

  return (
    <section
      id="experience"
      aria-labelledby="why-choose-us-heading"
      className="bg-[var(--color-dark-surface)] py-20 text-[#FFFDF9] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div id="why-choose-us-heading">
            <SectionHeader
              eyebrow={whyChooseUs.eyebrow}
              title={whyChooseUs.title}
              description={whyChooseUs.description}
              dark
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.items.map((item, idx) => {
            const Icon = FEATURE_ICONS[item.icon] || Sparkles;
            return (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="group h-full rounded-2xl border border-[#FFFDF9]/10 bg-[#2F231E]/75 p-7 transition-all duration-300 hover:border-[#B66A45]/50 hover:bg-[#352822]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B66A45]/20 text-[#E09A76] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#FFFDF9]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#D8CCC0]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
