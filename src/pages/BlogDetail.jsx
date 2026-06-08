import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import {
  ArrowLeft, Clock, Calendar, Share2,
  Twitter, Linkedin, Copy, ArrowRight, Check
} from 'lucide-react';
import { blogsData } from '../data/blogsData';
import BlogCard from '../components/BlogCard';

const categoryColors = {
  Science: 'bg-blue-50 text-blue-700 border-blue-200',
  Sourcing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Industry Trends': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = blogsData.find((p) => p.slug === slug);
  const related = blogsData.filter((p) => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true });
  }, [post, navigate]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return null;

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      {/* ─── HERO ─── */}
      <div className="relative bg-forest-950 pt-24 pb-0">
        <div className="absolute inset-0">
          <img src={post.coverImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-start gap-4 mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-forest-400 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Journal
              </Link>
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                  categoryColors[post.category] ?? 'bg-stone-100 text-stone-600 border-stone-200'
                }`}
              >
                {post.category}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-forest-400">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <span className="block text-white font-medium text-sm">{post.author}</span>
                  <span className="text-xs text-forest-400">{post.authorRole}</span>
                </div>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── CONTENT + SIDEBAR ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Lead image */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-md aspect-[16/8]">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Lead excerpt */}
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium border-l-4 border-amber-400 pl-5 mb-8 italic">
              {post.excerpt}
            </p>

            {/* Body content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: marked.parse(post.body || '') }}
            />

            {/* Tags / bottom share */}
            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {['Natural Aromatics', 'Botanical Science', 'Wellness'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300 text-xs font-medium rounded-full border border-forest-100 dark:border-forest-800">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <Share2 className="w-4 h-4" />
                Share this article
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Share */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-stone-100 dark:border-slate-700 shadow-sm">
              <h3 className="font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-500" />
                Share This Article
              </h3>
              <div className="space-y-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-stone-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-sky-500" />
                  Share on Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-stone-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  Share on LinkedIn
                </a>
                <button
                  onClick={copyLink}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-stone-100 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
                  aria-label="Copy article link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-forest-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-stone-100 dark:border-slate-700 shadow-sm">
              <h3 className="font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">About the Author</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-forest-900 flex items-center justify-center text-white font-bold shrink-0">
                  {post.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{post.author}</p>
                  <p className="text-xs text-amber-600 font-medium mb-2">{post.authorRole}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Expert at Aromatic Solutions, contributing cutting-edge research and field insights
                    to the natural aromatics industry.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-forest-900 rounded-2xl p-6 text-white">
              <h3 className="font-serif font-bold text-lg mb-2">Collaborate With Us</h3>
              <p className="text-forest-300 text-sm leading-relaxed mb-5">
                Interested in sourcing certified botanical ingredients or custom formulation support?
                Our expert team is ready.
              </p>
              <Link
                to="/contact?inquiry=Custom+Formulation+Request"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-all text-sm"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ─── RELATED ARTICLES ─── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
