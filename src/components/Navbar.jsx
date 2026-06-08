import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, ChevronRight, Sun, Moon } from 'lucide-react';
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
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-40 flex flex-col p-6 md:hidden border-l border-stone-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif font-bold text-forest-900 dark:text-white text-lg">Menu</span>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link) => (
                link.to === '/#solutions' ? (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => handleSolutionsClick(e, link.to)}
                    className="px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        isActive
                          ? 'text-forest-800 dark:text-amber-400 bg-forest-50 dark:bg-slate-800 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
            </nav>
            <Link
              to="/contact?inquiry=Bulk+Wholesale+Purchase"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-forest-900 hover:bg-forest-700 text-white font-medium rounded-full transition-all"
            >
              Request a Quote
              <ChevronRight className="w-4 h-4" />
            </Link>
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
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
