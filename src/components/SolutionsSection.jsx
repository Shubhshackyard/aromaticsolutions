import SectionHeading from './SectionHeading';
import SolutionCard from './SolutionCard';
import { productCategories } from '../data/productsData';

export default function SolutionsSection() {
  return (
    <section id="solutions" className="scroll-mt-28 bg-white dark:bg-slate-950 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Solutions"
          title="Everything we source, formulate, and supply"
          description="From aromatherapy staples to industrial fragrance systems, our catalog is designed for teams that need dependable ingredients and clear documentation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {productCategories.map((category) => (
            <SolutionCard
              key={category.id}
              category={category}
              onContactClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
