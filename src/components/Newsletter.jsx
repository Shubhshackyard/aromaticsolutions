import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { postFunction } from '../lib/functionsApi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await postFunction('subscribe', { email });
      setEmail('');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-emerald-300"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Subscribed. Welcome to our knowledge community.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="your@email.com"
              className="field-control flex-1 rounded-full border-forest-600/50 bg-forest-800/60 text-white placeholder-forest-400 focus:ring-amber-400/40 hover:border-forest-500"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="button-primary shrink-0 px-5 py-2.5"
              aria-label="Subscribe to newsletter"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {error && <p className="field-error mt-1.5 text-rose-300" role="alert">{error}</p>}
    </div>
  );
}
