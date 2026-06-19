import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Phone, Clock, Linkedin, Instagram
} from 'lucide-react';
import ContactForm from '../components/ContactForm';

const contactCards = [
  {
    icon: <MapPin className="w-5 h-5 text-forest-600" />,
    title: 'Our Address',
    lines: [
      'Aromatic Solutions',
      'Hajiganj Khurd, Harinagar',
      'Kannauj, Uttar Pradesh – 209725',
      'India',
    ],
  },
  {
    icon: <Mail className="w-5 h-5 text-forest-600" />,
    title: 'Email Us',
    lines: ['aromaticsolutions77@gmail.com'],
    links: true,
    type: 'email',
  },
  {
    icon: <Phone className="w-5 h-5 text-forest-600" />,
    title: 'Call Us',
    lines: ['+91 81153 87077'],
    links: true,
    type: 'tel',
  },
  {
    icon: <Clock className="w-5 h-5 text-forest-600" />,
    title: 'Business Hours',
    lines: [
      'Monday – Friday: 9:00 AM – 6:30 PM',
      'Saturday: 10:00 AM – 2:00 PM',
      'Sunday & Public Holidays: Closed',
    ],
  },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const defaultInquiry = searchParams.get('inquiry') || '';

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      {/* ─── PAGE HERO ─── */}
      <section className="pt-24 pb-14 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=1400&auto=format&fit=crop&q=60"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 to-forest-950" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Start a Conversation
            </h1>
            <p className="text-forest-300 text-lg leading-relaxed">
              Whether you're a formulator, brand owner, or researcher — our team of botanical
              experts is ready to understand your requirements and craft the perfect solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* LEFT — Info Column (2/5) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mb-2">
                Contact Information
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Reach out via your preferred channel. We respond to all enquiries within
                24 business hours.
              </p>
            </div>

            {/* Contact Cards */}
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-stone-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1.5">{card.title}</h3>
                    {card.lines.map((line) =>
                      card.links ? (
                        <a
                          key={line}
                          href={`${card.type === 'email' ? 'mailto' : 'tel'}:${line.replace(/\s/g, '')}`}
                          className="block text-sm text-forest-700 hover:text-amber-600 transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Embed */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.034006033846!2d79.908608676204!3d27.060674526559314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e6f6452060f39%3A0x9fea00471d1c187b!2sHari%20Nagar%2C%20Safdarganj%2C%20Kannauj%2C%20Uttar%20Pradesh%20209725!5e0!3m2!1sen!2sin!4v1781796470854!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aromatic Solutions Location"
                className="w-full"
              />
            </div>

            {/* Socials */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/aromatic-solutions-a03981353', label: 'LinkedIn' },
                  { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/aromatic_solutions', label: 'Instagram' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-forest-900 dark:hover:bg-forest-700 hover:text-white hover:border-forest-900 transition-all shadow-sm"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form Column (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-100 dark:border-slate-700 shadow-md p-7 sm:p-9">
              <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mb-1">
                Send Us an Enquiry
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-7">
                All fields marked <span className="text-red-500">*</span> are required.
                Our team will respond within 24 business hours.
              </p>
              <ContactForm defaultInquiry={defaultInquiry} />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
