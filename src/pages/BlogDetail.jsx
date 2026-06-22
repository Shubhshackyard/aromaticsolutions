import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, CalendarDays } from 'lucide-react';
import { blogsData } from '../data/blogsData';
import MarkdownRenderer from '../components/MarkdownRenderer';
import BlogCard from '../components/BlogCard';

const categoryColors = {
  Science: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900',
  Sourcing: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
  'Industry Trends': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
};

export default function BlogDetail() {
  const { slug } = useParams();
  const post = useMemo(() => blogsData.find((item) => item.slug === slug), [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogsData.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main className="bg-white dark:bg-slate-950">
      <article>
        <header className="relative overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-slate-950 text-white">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[post.category] ?? 'border-white/20 bg-white/10 text-white/80'}`}>
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-white/75">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author} · {post.authorRole}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-3xl object-cover shadow-xl shadow-slate-900/10"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <MarkdownRenderer content={post.body} />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 dark:border-slate-800 dark:bg-slate-900/60 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Related reads</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {relatedPosts.map((related, index) => (
                <BlogCard key={related.slug} post={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
