import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryColors = {
  Science: 'bg-blue-50 text-blue-700 border-blue-200',
  Sourcing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Industry Trends': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-stone-100 dark:border-slate-700 transition-all duration-300 group flex flex-col"
    >
      {/* Cover */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span
          className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${
            categoryColors[post.category] ?? 'bg-stone-100 text-stone-600 border-stone-200'
          }`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-lg text-slate-800 dark:text-slate-100 leading-snug mb-2 group-hover:text-forest-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author.split(' ').slice(-1)[0]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-forest-700 dark:text-amber-400 hover:text-forest-900 dark:hover:text-amber-300 group/link transition-colors"
            aria-label={`Read article: ${post.title}`}
          >
            Read Article
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
