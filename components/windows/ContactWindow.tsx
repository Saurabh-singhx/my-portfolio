'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Copy, Check, Send, Phone, MapPin, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactWindow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionComplete, setTransmissionComplete] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent! I'll reply soon.");
        setTransmissionComplete(true);
        reset();
        setTimeout(() => setTransmissionComplete(false), 4000);
      } else {
        toast.error('Something went wrong. Feel free to email directly.');
      }
    } catch {
      toast.error('Network error. Feel free to email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success(`Copied ${text} to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="h-full bg-[var(--bg-primary)] p-6 overflow-y-auto font-mono select-text space-y-6 transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-4">
        <div className="text-[var(--accent-secondary)] font-bold text-sm mb-1 flex items-center gap-2">
          <span># get_in_touch.sh</span>
          <span className="text-[10px] bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] px-1.5 py-0.5 rounded border border-[var(--accent-secondary)]/30">
            SECURE
          </span>
        </div>
        <div className="text-[var(--text-secondary)] text-xs">
          {`> Open to Full-Stack, AI Engineering & Production Backend roles.`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Form Column */}
        <div className="md:col-span-3 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs text-[var(--accent-primary)] mb-1">
                {`> Name:`}
              </label>
              <input
                {...register('name')}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="e.g. Alex Morgan / Technical Recruiter"
              />
              {errors.name && (
                <span className="text-[var(--accent-red)] text-xs mt-1 block">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs text-[var(--accent-primary)] mb-1">
                {`> Email Address:`}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="alex@company.com"
              />
              {errors.email && (
                <span className="text-[var(--accent-red)] text-xs mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs text-[var(--accent-primary)] mb-1">
                {`> Message / Job Opportunity:`}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                placeholder="Hi Saurabh, we were impressed with Sonix Music and your LangGraph projects..."
              />
              {errors.message && (
                <span className="text-[var(--accent-red)] text-xs mt-1 block">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-secondary)]/15 hover:bg-[var(--accent-secondary)]/25 border border-[var(--accent-secondary)]/40 text-[var(--accent-secondary)] rounded-lg font-mono text-xs transition-all disabled:opacity-50 hover:scale-[1.01]"
            >
              <Send size={13} />
              <span>{isSubmitting ? 'Transmitting...' : 'Send Message →'}</span>
            </button>

            {transmissionComplete && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-[var(--accent-secondary)]/15 border border-[var(--accent-secondary)]/30 text-[var(--accent-secondary)] text-xs"
              >
                {`✓ Transmission received! Thank you for reaching out. I'll get back to you shortly.`}
              </motion.div>
            )}
          </form>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Direct Contact
            </div>

            {/* Email */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 truncate pr-1">
                <Mail size={13} className="text-[var(--accent-primary)] flex-shrink-0" />
                <span className="text-[var(--text-secondary)] truncate text-[11px]">saurabh4442kumar@gmail.com</span>
              </div>
              <button
                onClick={() => copyToClipboard('saurabh4442kumar@gmail.com', 'email')}
                title="Copy email"
                className="text-[var(--text-secondary)] hover:text-white transition-colors p-1"
              >
                {copiedKey === 'email' ? <Check size={13} className="text-[var(--accent-secondary)]" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[var(--accent-secondary)] flex-shrink-0" />
                <span className="text-[var(--text-secondary)] text-[11px]">+91 9304355834</span>
              </div>
              <button
                onClick={() => copyToClipboard('+919304355834', 'phone')}
                title="Copy phone"
                className="text-[var(--text-secondary)] hover:text-white transition-colors p-1"
              >
                {copiedKey === 'phone' ? <Check size={13} className="text-[var(--accent-secondary)]" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
              <MapPin size={13} className="text-[var(--accent-tertiary)] flex-shrink-0" />
              <span className="text-[var(--text-secondary)] text-[11px]">Patna, Bihar, India (UTC +5:30)</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
              Developer Profiles
            </div>

            <a
              href="https://github.com/Saurabh-singhx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs transition-colors group"
            >
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <FaGithub size={15} />
                <span>github.com/Saurabh-singhx</span>
              </div>
              <span className="text-[var(--text-secondary)] group-hover:text-white text-[11px]">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/saurabh-kumar0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs transition-colors group"
            >
              <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                <FaLinkedin size={15} />
                <span>linkedin.com/in/saurabh-kumar0</span>
              </div>
              <span className="text-[var(--text-secondary)] group-hover:text-white text-[11px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}