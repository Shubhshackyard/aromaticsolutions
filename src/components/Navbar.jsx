import { useEffect, useState } from 'react';
import { Menu, X, ChevronRight, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

function scrollToAnchor(anchor) {
  const targetId = anchor.replace('#', '');
  const target = document.getElementById(targetId);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', anchor);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const topBarClass = dark ? 'bg-[rgb(3,6,22)]' : 'bg-[rgb(17,38,28)]';
  const topLineClass = dark ? 'bg-white/10' : 'bg-white/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 dark:border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
          : `${topBarClass} backdrop-blur-md backdrop-saturate-150 border-b border-white/10`
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${scrolled ? 'bg-white/80' : topLineClass}`} />

      <nav className="section-shell min-h-[4.5rem] md:min-h-[5rem] py-2.5 md:py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToAnchor('#home')}
          className="flex items-center gap-2.5 md:gap-3 group min-w-0 max-w-[calc(100%-7rem)] text-left"
          aria-label="Aromatic Solutions Home"
        >
          <div className={`w-10 h-10 md:w-11 md:h-11 shrink-0 overflow-hidden rounded-full bg-transparent shadow-sm transition-all duration-300 ${
            scrolled
              ? 'border border-forest-200/60 group-hover:border-forest-200'
              : 'border border-white/15 group-hover:border-white/25'
          }`}>
            <img src="/logo.webp" alt="Aromatic Solutions" className="h-full w-full object-fill p-0.5" />
          </div>
          <div className="flex min-w-0 flex-col justify-center leading-[0.92] md:leading-[0.95] pt-0.5">
            <span className={`block truncate font-serif font-bold text-[1rem] sm:text-[1.15rem] md:text-[1.7rem] tracking-[-0.04em] transition-colors duration-300 ${
              scrolled ? 'text-forest-900 dark:text-white' : 'text-white'
            }`}>
              Aromatic
            </span>
            <span className="mt-1 block truncate text-[0.58rem] sm:text-[0.62rem] md:text-[0.72rem] font-sans font-semibold text-amber-400 tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.28em] uppercase">
              Solutions
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                setIsOpen(false);
                scrollToAnchor(link.href);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-slate-800'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 self-center">
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              scrollToAnchor('#contact');
            }}
            className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
              scrolled
                ? 'bg-forest-900 hover:bg-forest-700 dark:bg-forest-700 dark:hover:bg-forest-600 text-white'
                : 'bg-amber-500/95 hover:bg-amber-400 text-white border border-amber-400/30'
            }`}
          >
            Request a Quote
            <ChevronRight className="w-4 h-4" />
          </a>

          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.88, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-slate-600 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                : 'text-white/85 hover:text-white hover:bg-white/10'
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
            onClick={() => setIsOpen((value) => !value)}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 36, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className={`absolute right-3 top-[calc(100%+0.65rem)] z-40 flex max-h-[calc(100dvh-6rem)] w-[min(21rem,calc(100vw-1.5rem))] min-h-[22rem] flex-col overflow-hidden rounded-[28px] border p-2.5 shadow-[0_22px_60px_rgba(5,20,12,0.5)] backdrop-blur-2xl backdrop-saturate-150 md:hidden ${
              scrolled
                ? 'border-amber-300/18 bg-white/85 dark:border-amber-200/12 dark:bg-slate-900/80'
                : `${topBarClass} border-amber-300/18 dark:border-amber-200/12`
            }`}
          >
            <div className={`pointer-events-none absolute inset-0 ${
              scrolled
                ? 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.06),transparent_28%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04))]'
                : 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_32%),linear-gradient(180deg,rgba(5,20,12,0.18),rgba(5,20,12,0.08))]'
            }`} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

            <div className={`relative flex h-full flex-col rounded-[24px] border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${
              scrolled
                ? 'border-white/30 bg-white/70 dark:border-white/12 dark:bg-slate-900/70'
                : 'border-white/12 bg-[rgb(17,38,28)] dark:bg-[rgb(3,6,22)]'
            }`}>
              <div className={`flex items-start justify-between gap-4 border-b pb-4 ${
                scrolled ? 'border-slate-200 dark:border-white/10' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border bg-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
                    scrolled
                      ? 'border-forest-200/50 dark:border-forest-700/60'
                      : 'border-white/12'
                  }`}>
                    <img src="/logo.webp" alt="Aromatic Solutions" className="h-full w-full object-contain p-0.5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-serif text-lg font-semibold tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>Explore</p>
                    <p className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] ${scrolled ? 'text-amber-600 dark:text-amber-300/70' : 'text-amber-200/70'}`}>
                      <Sparkles className="h-3.5 w-3.5" />
                      Aromatic Solutions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    scrolled
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800'
                      : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setIsOpen(false);
                      scrollToAnchor(link.href);
                    }}
                    className={`${'group flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-300'} ${
                      scrolled
                        ? 'border border-transparent text-slate-700 hover:border-amber-300/15 hover:bg-forest-50 hover:text-forest-800 dark:text-slate-200 dark:hover:bg-slate-800'
                        : 'border border-transparent text-stone-100/90 hover:border-amber-300/15 hover:bg-forest-900/75 hover:text-amber-200'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 ${
                      scrolled ? 'text-slate-400 group-hover:text-forest-700 dark:text-slate-500 dark:group-hover:text-amber-300' : 'text-amber-200/45 group-hover:text-amber-300'
                    }`} />
                  </a>
                ))}
              </nav>

              <div className={`mt-4 rounded-[22px] border p-4 ${
                scrolled ? 'border-forest-200 bg-forest-50 dark:border-slate-700 dark:bg-slate-800/80' : 'border-amber-300/14 bg-forest-900/75'
              }`}>
                <p className={`text-xs font-medium uppercase tracking-[0.22em] ${scrolled ? 'text-amber-600 dark:text-amber-400' : 'text-amber-200/70'}`}>Need sourcing support?</p>
                <p className={`mt-2 text-sm leading-6 ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-stone-200/85'}`}>
                  Connect with our team for formulations, bulk orders, and tailored aromatic blends.
                </p>
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsOpen(false);
                    scrollToAnchor('#contact');
                  }}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? 'border-forest-200 bg-forest-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.10)] hover:bg-forest-800'
                      : 'border-amber-300/20 bg-amber-400 text-forest-950 shadow-[0_12px_30px_rgba(251,191,36,0.18)] hover:bg-amber-300'
                  }`}
                >
                  Request a Quote
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[linear-gradient(180deg,rgba(4,18,11,0.22),rgba(4,18,11,0.56))] backdrop-blur-[2px] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
