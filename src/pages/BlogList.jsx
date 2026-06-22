import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogsData } from '../data/blogsData';

export default function BlogList() {
  return (
    <main className="bg-stone-50 dark:bg-slate-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 dark:text-amber-400">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="mt-5 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600 dark:text-amber-400">
            Blog
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Science, sourcing, and formulation notes
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            A small library of articles covering aromatherapy science, supply chain ethics, and market trends.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogsData.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
