import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock, User, X } from 'lucide-react';
import { blogsData } from '../data/blogsData';
import BlogCard from '../components/BlogCard';

const categories = ['All', 'Science', 'Sourcing', 'Industry Trends'];

const categoryColors = {
  Science: 'bg-blue-50 text-blue-700 border-blue-200',
  Sourcing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Industry Trends': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BlogList() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = blogsData.find((p) => p.featured);

  const filtered = useMemo(() => {
    return blogsData.filter((post) => {
      const matchCat = activeCategory === 'All' || post.category === activeCategory;
      const matchQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      {/* ─── PAGE HERO ─── */}
      <section className="pt-24 pb-12 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1400&auto=format&fit=crop&q=60"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/50 to-forest-950" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
              Knowledge Hub
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              The Aromatic Journal
            </h1>
            <p className="text-forest-300 text-lg leading-relaxed">
              Science, sourcing stories, and industry intelligence from the world of natural aromatics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 py-12">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4 block">
            Featured Article
          </span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-forest-900 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[260px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest-900/60 hidden lg:block" />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span
                  className={`inline-block self-start text-xs font-medium px-2.5 py-1 rounded-full border mb-4 ${
                    categoryColors[featured.category]
                  }`}
                >
                  {featured.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-forest-300 leading-relaxed text-sm mb-6 line-clamp-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-forest-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {featured.author}
                  </span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="self-start flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-all text-sm group/btn"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── SEARCH + FILTERS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-forest-400 dark:focus:border-amber-500 focus:ring-2 focus:ring-forest-100 dark:focus:ring-amber-900/30 transition-all"
              aria-label="Search blog articles"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-900 dark:bg-forest-700 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700 hover:border-forest-300 dark:hover:border-amber-500 hover:text-forest-700 dark:hover:text-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No articles found.</p>
            <p className="text-sm mt-1">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
