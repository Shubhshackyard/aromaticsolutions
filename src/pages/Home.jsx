import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Leaf, Sparkles } from 'lucide-react';
import { productCategories, stats, testimonials } from '../data/productsData';
import { blogsData } from '../data/blogsData';
import BlogCard from '../components/BlogCard';

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600 dark:text-amber-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.16),transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
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
              <Link
                to="/contact?inquiry=Bulk+Wholesale+Purchase"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Read the Blog
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-2xl">{item.icon}</div>
                <p className="mt-4 text-3xl font-bold">{item.value}</p>
                <p className="mt-1 text-sm text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-white dark:bg-slate-950 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Solutions"
            title="Everything we source, formulate, and supply"
            description="From aromatherapy staples to industrial fragrance systems, our catalog is designed for teams that need dependable ingredients and clear documentation."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {productCategories.map((category) => (
              <article
                key={category.id}
                className="overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-7 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400">
                          {category.subtitle}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {category.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {category.products.slice(0, 5).map((product) => (
                        <li key={product} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="h-4 w-4 text-forest-600 dark:text-amber-400 shrink-0" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`min-h-[260px] bg-gradient-to-br ${category.gradient} relative overflow-hidden`}
                  >
                    <img
                      src={category.bgPattern}
                      alt={category.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 dark:bg-slate-900/60 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Built for teams that need confidence in every shipment"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((item) => (
              <article key={item.id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-sm font-bold text-forest-800 dark:bg-forest-900 dark:text-amber-300">
                    {item.avatar}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.quote}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  {item.company}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Knowledge"
            title="Latest articles from the Aromatic Solutions team"
            description="Explore our research, sourcing stories, and formulation insights."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredBlogs.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 text-white py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-amber-400" />
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold">Need a sourcing partner for your next launch?</h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-white/75">
            Let’s talk about volumes, certifications, blends, and the documentation your team needs to move quickly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact?inquiry=Custom+Formulation+Request"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-forest-950 transition hover:bg-amber-100"
            >
              Start a Conversation
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
