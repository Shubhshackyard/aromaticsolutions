import { ArrowRight, Leaf } from 'lucide-react';
import { stats } from '../data/productsData';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-slate-950 text-white scroll-mt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.16),transparent_32%)]" />
      <div className="relative section-shell py-24 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-amber-100 backdrop-blur">
            <Leaf className="h-4 w-4 text-amber-300" />
            Pure botanicals, tested with scientific precision
          </p>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Aromatic ingredients for wellness, fragrance, and formulation teams.
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-white/80">
            We supply GC/MS-tested essential oils, carrier oils, fragrance bases, herbal extracts, and food flavors for brands that care about quality, provenance, and consistency.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="button-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#blog" className="button-dark">
              Read the Blog
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="surface-card-glass p-5">
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-4 text-3xl font-bold">{item.value}</p>
              <p className="mt-1 text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
