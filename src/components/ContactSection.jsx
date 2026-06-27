import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 bg-white dark:bg-slate-950 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s plan your next sourcing request"
          description="Tell us what you need, and we’ll help with product fit, volumes, documentation, and lead time."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card p-6 sm:p-8">
            <ContactForm defaultInquiry="Bulk Wholesale Purchase" />
          </div>

          <aside className="surface-card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-5 rounded-3xl border border-stone-200/70 bg-white/60 p-5 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[1.75rem] border border-stone-200/60 bg-transparent p-1.5 dark:border-slate-700">
                <img src="/logo-ex.png" alt="Aromatic Solutions" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-700 dark:text-amber-400">Contact details</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Reach the team for sourcing, volumes, and documentation.
                </p>
              </div>
            </div>
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

            <div className="mt-8">
              <p className="section-kicker">Social</p>
              <div className="mt-4 flex items-center gap-3">
                <a href="https://www.linkedin.com/in/aromatic-solutions-a03981353" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-white transition-colors hover:bg-forest-700 dark:bg-slate-800">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/aromatic_solutions" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-white transition-colors hover:bg-forest-700 dark:bg-slate-800">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
