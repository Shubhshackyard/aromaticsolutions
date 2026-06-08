import { Link } from 'react-router-dom';
import { Leaf, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Newsletter from './Newsletter';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Solutions', to: '/#solutions' },
  { label: 'Blog & Knowledge Hub', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Request a Quote', to: '/contact?inquiry=Bulk+Wholesale+Purchase' },
];

const industries = [
  'Aromatherapy & Wellness',
  'Personal Care & Cosmetics',
  'Soap & Detergent',
  'Food & Beverage',
  'Pharmaceuticals',
  'Nutraceuticals',
  'Home Fragrance',
  'Luxury Perfumery',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-forest-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-amber-400" />
              </div>
              <div className="leading-none">
                <span className="block font-serif font-bold text-white text-base">Aromatic</span>
                <span className="block text-[10px] font-medium text-amber-400 tracking-widest uppercase">Solutions</span>
              </div>
            </Link>
            <p className="text-sm text-forest-400 leading-relaxed mb-5">
              Premium manufacturer and distributor of GC/MS-tested essential oils, carrier oils, herbal extracts, and custom industrial fragrances. Bridging nature's purity with scientific precision.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/aromatic-solutions-a03981353" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-forest-800 hover:bg-amber-500 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/aromatic_solutions" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-forest-800 hover:bg-amber-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-forest-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Industries */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-4">Industries Served</h3>
            <ul className="space-y-2.5">
              {industries.map((ind) => (
                <li key={ind} className="text-sm text-forest-400">{ind}</li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter & Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-2">Knowledge Newsletter</h3>
            <p className="text-sm text-forest-400 mb-4">
              Aromatherapy science, sourcing stories, and formulation trends — delivered monthly.
            </p>
            <Newsletter />
            <div className="mt-6 space-y-2.5">
              <a href="mailto:aromaticsolutions77@gmail.com" className="flex items-center gap-2 text-sm text-forest-400 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                aromaticsolutions77@gmail.com
              </a>
              <a href="tel:+918115387077" className="flex items-center gap-2 text-sm text-forest-400 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +91 81153 87077
              </a>
              <span className="flex items-start gap-2 text-sm text-forest-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                Kannauj, Uttar Pradesh, India
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-500">
            © {year} Aromatic Solutions. All rights reserved.
          </p>
          <p className="text-xs text-forest-600">
            <a href="https://www.aromaticsolutions.co.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              www.aromaticsolutions.co.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
