import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { postFunction } from '../lib/functionsApi';

const inquiryTypes = [
  'Bulk Wholesale Purchase',
  'Custom Formulation Request',
  'Product Sample Inquiry',
  'General Support',
];

function InputField({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ defaultInquiry = '' }) {
  const createInitialForm = () => ({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiry: defaultInquiry || inquiryTypes[0],
    message: '',
  });

  const [form, setForm] = useState(createInitialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.company.trim()) e.company = 'Company name is required.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'A valid email address is required.';
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone))
      e.phone = 'Enter a valid phone number.';
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = 'Please provide at least 20 characters of detail.';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setServerError('');
    try {
      await postFunction('contact', form);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `field-control ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-300 dark:border-red-400/40 dark:bg-red-950/20'
        : 'border-stone-200 hover:border-stone-300 focus:ring-forest-400 dark:border-slate-600 dark:hover:border-slate-500 dark:focus:ring-amber-500/40'
    }`;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center text-center py-12 px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-forest-50 dark:bg-forest-900/30 border-4 border-forest-200 dark:border-forest-700 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-forest-600" />
          </motion.div>
          <h3 className="font-serif text-2xl font-semibold text-forest-900 dark:text-white mb-2">
            Thank you, {form.name.split(' ')[0]}!
          </h3>
          {form.company && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              We've received your enquiry from <strong>{form.company}</strong>.
            </p>
          )}
          <p className="text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
            One of our expert consultants will review your{' '}
            <span className="font-medium text-forest-700">{form.inquiry}</span> request and reach out
            to you within <strong>24 business hours</strong>.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(createInitialForm());
              setErrors({});
              setServerError('');
            }}
            className="button-secondary mt-8"
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name *" id="name" error={errors.name}>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Dr. Priya Sharma"
                className={inputClass('name')}
              />
            </InputField>
            <InputField label="Company Name *" id="company" error={errors.company}>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={handleChange('company')}
                placeholder="NatureCraft Pvt. Ltd."
                className={inputClass('company')}
              />
            </InputField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Email Address *" id="email" error={errors.email}>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@company.com"
                className={inputClass('email')}
              />
            </InputField>
            <InputField label="Phone Number" id="phone" error={errors.phone}>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+91 98765 43210"
                className={inputClass('phone')}
              />
            </InputField>
          </div>

          <InputField label="Inquiry Type *" id="inquiry" error={errors.inquiry}>
            <select
              id="inquiry"
              value={form.inquiry}
              onChange={handleChange('inquiry')}
              className={inputClass('inquiry')}
            >
              {inquiryTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </InputField>

          <InputField label="Your Message *" id="message" error={errors.message}>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Please describe your requirements — product types, volumes, intended application, and any regulatory standards you need to meet..."
              className={`${inputClass('message')} resize-none`}
            />
          </InputField>

          {serverError && (
            <p className="field-error" role="alert" aria-live="polite">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {serverError}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="button-primary w-full rounded-xl bg-forest-900 px-6 py-3.5 shadow-md shadow-forest-950/10 hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-forest-800 dark:hover:bg-forest-700"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            ) : (
              <><Send className="w-4 h-4" /> Send Inquiry</>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
