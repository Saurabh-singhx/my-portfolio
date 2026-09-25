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
    <div className="h-full bg-[#0b0e14] p-6 overflow-y-auto font-mono select-text space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="text-[#00ff41] font-bold text-sm mb-1 flex items-center gap-2">
          <span># get_in_touch.sh</span>
          <span className="text-[10px] bg-[#00ff41]/10 text-[#00ff41] px-1.5 py-0.5 rounded border border-[#00ff41]/20">
            SECURE
          </span>
        </div>
        <div className="text-[#8b949e] text-xs">
          {`> Open to Full-Stack, AI Engineering & Production Backend roles.`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Form Column */}
        <div className="md:col-span-3 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs text-[#00d2ff] mb-1">
                {`> Name:`}
              </label>
              <input
                {...register('name')}
                className="w-full bg-[#141a24] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#e6edf3] placeholder-[#8b949e] outline-none focus:border-[#00d2ff] transition-colors"
                placeholder="e.g. Alex Morgan / Technical Recruiter"
              />
              {errors.name && (
                <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#00d2ff] mb-1">
                {`> Email Address:`}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full bg-[#141a24] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#e6edf3] placeholder-[#8b949e] outline-none focus:border-[#00d2ff] transition-colors"
                placeholder="alex@company.com"
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#00d2ff] mb-1">
                {`> Message / Job Opportunity:`}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full bg-[#141a24] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#e6edf3] placeholder-[#8b949e] outline-none focus:border-[#00d2ff] transition-colors resize-none"
                placeholder="Hi Saurabh, we were impressed with Sonix Music and your LangGraph projects..."
              />
              {errors.message && (
                <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00ff41]/10 hover:bg-[#00ff41]/20 border border-[#00ff41]/40 text-[#00ff41] rounded-lg font-mono text-xs transition-all disabled:opacity-50 hover:scale-[1.01]"
            >
              <Send size={13} />
              <span>{isSubmitting ? 'Transmitting...' : 'Send Message →'}</span>
            </button>

            {transmissionComplete && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs"
              >
                {`✓ Transmission received! Thank you for reaching out. I'll get back to you shortly.`}
              </motion.div>
            )}
          </form>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#141a24] border border-white/[0.08] rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Direct Contact
            </div>

            {/* Email */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0d1117] border border-white/5">
              <div className="flex items-center gap-2 truncate pr-1">
                <Mail size={13} className="text-[#00d2ff] flex-shrink-0" />
                <span className="text-[#c9d1d9] truncate text-[11px]">saurabh4442kumar@gmail.com</span>
              </div>
              <button
                onClick={() => copyToClipboard('saurabh4442kumar@gmail.com', 'email')}
                title="Copy email"
                className="text-[#8b949e] hover:text-white transition-colors p-1"
              >
                {copiedKey === 'email' ? <Check size={13} className="text-[#00ff41]" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0d1117] border border-white/5">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#00ff41] flex-shrink-0" />
                <span className="text-[#c9d1d9] text-[11px]">+91 9304355834</span>
              </div>
              <button
                onClick={() => copyToClipboard('+919304355834', 'phone')}
                title="Copy phone"
                className="text-[#8b949e] hover:text-white transition-colors p-1"
              >
                {copiedKey === 'phone' ? <Check size={13} className="text-[#00ff41]" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[#0d1117] border border-white/5">
              <MapPin size={13} className="text-[#ffbd2e] flex-shrink-0" />
              <span className="text-[#c9d1d9] text-[11px]">Patna, Bihar, India (UTC +5:30)</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-[#141a24] border border-white/[0.08] rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Developer Profiles
            </div>

            <a
              href="https://github.com/Saurabh-singhx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-[#0d1117] hover:bg-[#1a2230] border border-white/5 text-xs transition-colors group"
            >
              <div className="flex items-center gap-2 text-[#e6edf3]">
                <FaGithub size={15} />
                <span>github.com/Saurabh-singhx</span>
              </div>
              <span className="text-[#8b949e] group-hover:text-white text-[11px]">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/saurabh-kumar0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-[#0d1117] hover:bg-[#1a2230] border border-white/5 text-xs transition-colors group"
            >
              <div className="flex items-center gap-2 text-[#00d2ff]">
                <FaLinkedin size={15} />
                <span>linkedin.com/in/saurabh-kumar0</span>
              </div>
              <span className="text-[#8b949e] group-hover:text-white text-[11px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}