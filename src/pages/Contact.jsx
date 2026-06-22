import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const defaultInquiry = useMemo(() => searchParams.get('inquiry') || '', [searchParams]);

  return (
    <main className="bg-stone-50 dark:bg-slate-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 dark:text-amber-400">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-5 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600 dark:text-amber-400">
            Contact
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let’s plan your next sourcing request
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Tell us what you need, and we’ll help with product fit, volumes, documentation, and lead time.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <ContactForm defaultInquiry={defaultInquiry} />
          </div>

          <aside className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Direct contact</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              If you’d rather speak directly, these are the fastest ways to reach the team.
            </p>
            <div className="mt-6 space-y-4">
              <a href="mailto:aromaticsolutions77@gmail.com" className="flex items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3 text-sm text-slate-700 transition hover:border-forest-300 hover:bg-forest-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                <Mail className="h-4 w-4 text-forest-700 dark:text-amber-400" />
                aromaticsolutions77@gmail.com
              </a>
              <a href="tel:+918115387077" className="flex items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3 text-sm text-slate-700 transition hover:border-forest-300 hover:bg-forest-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                <Phone className="h-4 w-4 text-forest-700 dark:text-amber-400" />
                +91 81153 87077
              </a>
              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                <MapPin className="mt-0.5 h-4 w-4 text-forest-700 dark:text-amber-400" />
                Kannauj, Uttar Pradesh, India
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
