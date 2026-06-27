export default function SolutionCard({ category, onContactClick }) {
  return (
    <article className="surface-card-soft overflow-hidden transition hover:shadow-lg">
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
                <span className="h-4 w-4 rounded-full bg-forest-600/15 ring-1 ring-forest-600/25 dark:bg-amber-400/15 dark:ring-amber-400/30" />
                {product}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onContactClick}
            className="button-secondary mt-6"
          >
            Request a Quote
          </button>
        </div>

        <div className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${category.gradient}`}>
          <img
            src={category.bgPattern}
            alt={category.title}
            className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </article>
  );
}
