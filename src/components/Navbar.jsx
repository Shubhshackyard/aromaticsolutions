import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, ChevronRight, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/#solutions' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleSolutionsClick = (e, to) => {
    if (to === '/#solutions') {
      e.preventDefault();
      setIsOpen(false);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const mobileLinkBase =
    'group flex items-center justify-between rounded-[22px] px-4 py-4 text-[15px] font-medium transition-all duration-300';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 dark:border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
          : 'bg-forest-950/30 backdrop-blur-md backdrop-saturate-150 border-b border-white/10'
      }`}
    >
      {/* Subtle top highlight line for glass edge effect */}
      <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${
        scrolled ? 'bg-white/80' : 'bg-white/20'
      }`} />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Aromatic Solutions Home">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            scrolled
              ? 'bg-forest-900 group-hover:bg-forest-700'
              : 'bg-white/15 border border-white/25 group-hover:bg-white/25'
          }`}>
            <Leaf className="w-5 h-5 text-amber-400" />
          </div>
          <div className="leading-none">
            <span className={`block font-serif font-bold text-base tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-forest-900 dark:text-white' : 'text-white'
            }`}>
              Aromatic
            </span>
            <span className="block text-[10px] font-sans font-medium text-amber-400 tracking-widest uppercase">
              Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.to === '/#solutions' ? (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleSolutionsClick(e, link.to)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-slate-800'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    scrolled
                      ? isActive
                        ? 'text-forest-800 dark:text-amber-400 bg-forest-50 dark:bg-slate-800 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-slate-800'
                      : isActive
                        ? 'text-white bg-white/15 font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>

        {/* CTA + Dark Mode Toggle + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/contact?inquiry=Bulk+Wholesale+Purchase"
            className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
              scrolled
                ? 'bg-forest-900 hover:bg-forest-700 dark:bg-forest-700 dark:hover:bg-forest-600 text-white'
                : 'bg-amber-500/90 hover:bg-amber-400 text-white border border-amber-400/30'
            }`}
          >
            Request a Quote
            <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Dark / Light mode toggle */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.88, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-slate-600 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Sun className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Moon className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className={`md:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
              scrolled
                ? 'border-white/70 bg-white/55 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200'
                : 'border-white/20 bg-white/10 text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] backdrop-blur-xl'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-white/40 to-white/5 dark:from-white/10 dark:to-transparent" />
            <span className="relative">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 36, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed inset-y-3 right-3 z-40 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[32px] border border-white/45 bg-white/55 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.32)] backdrop-blur-3xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-950/70 md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.02))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80 dark:bg-white/15" />

            <div className="relative flex h-full flex-col rounded-[28px] border border-white/40 bg-white/20 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-4 border-b border-slate-900/8 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/45 text-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-amber-300">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Aromatic Menu</p>
                    <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      Refined navigation
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/50 bg-white/45 text-slate-600 transition-all duration-300 hover:bg-white/70 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 flex flex-1 flex-col gap-2">
                {navLinks.map((link) => (
                  link.to === '/#solutions' ? (
                    <a
                      key={link.label}
                      href={link.to}
                      onClick={(e) => handleSolutionsClick(e, link.to)}
                      className={`${mobileLinkBase} text-slate-700 hover:bg-white/55 hover:text-forest-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-amber-500 dark:text-slate-500 dark:group-hover:text-amber-300" />
                    </a>
                  ) : (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `${mobileLinkBase} ${
                          isActive
                            ? 'bg-white/70 text-forest-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_35px_rgba(148,163,184,0.18)] dark:bg-white/10 dark:text-amber-300'
                            : 'text-slate-700 hover:bg-white/55 hover:text-forest-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isActive
                                ? 'translate-x-0.5 text-amber-500 dark:text-amber-300'
                                : 'text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-500 dark:text-slate-500 dark:group-hover:text-amber-300'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  )
                ))}
              </nav>

              <div className="mt-4 rounded-[26px] border border-white/45 bg-white/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Need sourcing support?</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Connect with our team for formulations, bulk orders, and tailored aromatic blends.
                </p>
                <Link
                  to="/contact?inquiry=Bulk+Wholesale+Purchase"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full border border-forest-800/10 bg-forest-900 px-4 py-3 text-sm font-medium text-white shadow-[0_16px_30px_rgba(17,24,39,0.22)] transition-all duration-300 hover:bg-forest-700 dark:border-white/10 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
                >
                  Request a Quote
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_20%),rgba(15,23,42,0.48)] backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
