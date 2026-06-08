import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, FlaskConical, Leaf, Globe, ShieldCheck,
  ChevronDown, Star, Quote
} from 'lucide-react';
import { productCategories, stats, testimonials } from '../data/productsData';
import { blogsData } from '../data/blogsData';
import BlogCard from '../components/BlogCard';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6 } }),
};

export default function Home() {
  const solutionsRef = useRef(null);

  const scrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-950">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600&auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/40 to-forest-950" />
        </div>

        {/* Botanical decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-forest-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-medium tracking-wider uppercase mb-6"
          >
            <Leaf className="w-3.5 h-3.5" />
            GC/MS Certified • 100% Pure • Sustainably Sourced
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            Nature's Purest Essences,{' '}
            <span className="text-gold italic">Engineered</span>{' '}
            for Perfection.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-forest-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium essential oils, carrier oils, herbal extracts and custom industrial fragrances —
            backed by science, sourced with integrity, trusted globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToSolutions}
              className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-amber-500/30 text-sm"
            >
              Explore Our Solutions
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact?inquiry=Product+Sample+Inquiry"
              className="flex items-center gap-2 px-7 py-3.5 border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all text-sm backdrop-blur-sm"
            >
              Get Free Samples
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onClick={scrollToSolutions}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-forest-400 hover:text-white transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      {/* ─── PHILOSOPHY / ABOUT ───────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-stone-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop"
                  alt="Aromatic Solutions laboratory distillation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-forest-900 text-white rounded-2xl p-5 shadow-xl w-44">
                <p className="font-serif text-3xl font-bold text-amber-400">15+</p>
                <p className="text-xs text-forest-300 mt-1 leading-snug">Years of botanical expertise</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-white mb-5 leading-tight">
                Where Ancient Wisdom Meets Modern Science
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-7">
                At Aromatic Solutions, we believe that the highest quality natural ingredients are
                not found — they are carefully cultivated, rigorously tested, and ethically sourced.
                Every product we deliver is the result of a meticulous process that begins in
                certified organic farms and ends in our ISO-certified analytical laboratory.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <Leaf className="w-5 h-5 text-forest-600" />,
                    title: '100% Organic & Pure Sourcing',
                    desc: 'All botanicals sourced from certified organic farms across India and globally.',
                  },
                  {
                    icon: <FlaskConical className="w-5 h-5 text-forest-600" />,
                    title: 'GC/MS Lab Testing on Every Batch',
                    desc: 'Gas Chromatography-Mass Spectrometry analysis guarantees identity, purity, and potency.',
                  },
                  {
                    icon: <Globe className="w-5 h-5 text-forest-600" />,
                    title: 'Eco-Friendly Distillation',
                    desc: 'Steam distillation processes optimised to minimise energy use and ecological footprint.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-stone-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ───────────────────────────────── */}
      <section id="solutions" ref={solutionsRef} className="py-20 lg:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
              Our Solutions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-white mb-4">
              Botanical Ingredients Across Every Industry
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              From wellness aromatherapy to pharmaceutical-grade phytochemicals, our catalogue serves
              the full spectrum of industries demanding natural excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 flex flex-col justify-end"
              >
                {/* Background */}
                <div className="absolute inset-0">
                  <img
                    src={cat.bgPattern}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-80 group-hover:opacity-70 transition-opacity`} />
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400 rounded-2xl transition-all duration-300 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 p-5">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-serif font-bold text-white text-lg leading-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-amber-300 text-xs font-medium mb-3">{cat.subtitle}</p>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to="/contact?inquiry=Product+Sample+Inquiry"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200"
                    >
                      Request Samples <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-forest-300 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-stone-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-white">
              Trusted by Formulators Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <Quote className="w-8 h-8 text-amber-300 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-forest-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    <p className="text-xs text-forest-600 font-medium">{t.company}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST BLOG POSTS ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-2">
                Knowledge Hub
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-white">
                Latest from Our Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-sm font-medium text-forest-700 hover:text-forest-900 group transition-colors shrink-0"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogsData.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 bg-forest-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Elevate Your Formulations?
          </h2>
          <p className="text-forest-300 text-lg mb-8 leading-relaxed">
            Whether you need bulk wholesale quantities, custom fragrance creation, or certified
            botanical extracts — our expert team is ready to collaborate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact?inquiry=Bulk+Wholesale+Purchase"
              className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-all shadow-lg"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact?inquiry=Product+Sample+Inquiry"
              className="flex items-center gap-2 px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-semibold rounded-full transition-all"
            >
              Request Free Samples
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
