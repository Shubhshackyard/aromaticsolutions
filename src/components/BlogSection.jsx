import { useMemo, useState } from 'react';
import SectionHeading from './SectionHeading';
import BlogCard from './BlogCard';
import MarkdownRenderer from './MarkdownRenderer';
import { blogsData } from '../data/blogsData';

export default function BlogSection() {
  const featuredBlogs = useMemo(() => blogsData.slice(0, 3), []);
  const [selectedSlug, setSelectedSlug] = useState(featuredBlogs[0]?.slug);

  const selectedPost = featuredBlogs.find((post) => post.slug === selectedSlug) || featuredBlogs[0];

  return (
    <section id="blog" className="scroll-mt-28 bg-stone-50 dark:bg-slate-900/60 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Knowledge"
          title="Latest articles from the Aromatic Solutions team"
          description="Explore our research, sourcing stories, and formulation insights."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredBlogs.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              active={post.slug === selectedSlug}
              onReadMore={() => setSelectedSlug(post.slug)}
            />
          ))}
        </div>

        {selectedPost && (
          <article className="mt-10 surface-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full max-w-2xl rounded-2xl object-cover shadow-sm lg:w-[42%]"
              />
              <div className="flex-1">
                <p className="section-kicker">Featured Read</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedPost.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {selectedPost.date} · {selectedPost.readTime} · {selectedPost.author}
                </p>
                <div className="mt-6">
                  <MarkdownRenderer content={selectedPost.body} />
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
