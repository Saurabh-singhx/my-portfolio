'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Copy, ExternalLink, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactWindow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionComplete, setTransmissionComplete] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
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
        toast.success('Message sent! I\'ll reply soon.');
        setTransmissionComplete(true);
        reset();
        setTimeout(() => setTransmissionComplete(false), 3000);
      } else {
        toast.error('Something went wrong. Try emailing directly.');
      }
    } catch {
      toast.error('Something went wrong. Try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  return (
    <div className="h-full bg-[#0a0a0a] p-6 overflow-auto font-mono">
      <div className="mb-6">
        <div className="text-[#00ff41] mb-1"># get_in_touch.sh</div>
        <div className="text-[#8b949e] text-sm">{`> Running contact module...`}</div>
        <div className="text-[#8b949e] text-sm">{`> All fields required.`}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <label className="text-[#00ff41] text-sm flex items-center gap-1">
            <span>{`> name:`}</span>
            <input
              {...register('name')}
              className="flex-1 bg-transparent text-[#e6edf3] outline-none border-b border-white/10 focus:border-[#00ff41] transition-colors"
              placeholder="Your name"
            />
          </label>
          {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
        </div>

        <div>
          <label className="text-[#00ff41] text-sm flex items-center gap-1">
            <span>{`> email:`}</span>
            <input
              {...register('email')}
              type="email"
              className="flex-1 bg-transparent text-[#e6edf3] outline-none border-b border-white/10 focus:border-[#00ff41] transition-colors"
              placeholder="your@email.com"
            />
          </label>
          {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
        </div>

        <div>
          <label className="text-[#00ff41] text-sm flex gap-1">
            <span className="whitespace-nowrap">{`> message:`}</span>
            <textarea
              {...register('message')}
              rows={4}
              className="flex-1 bg-transparent text-[#e6edf3] outline-none border border-white/10 focus:border-[#00ff41] transition-colors rounded p-2 resize-none"
              placeholder="Your message..."
            />
          </label>
          {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-[#00ff41]/30 text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-colors font-mono text-sm disabled:opacity-50"
        >
          {isSubmitting ? '[ Sending... ]' : '[ Send Message → ]'}
        </button>

        {transmissionComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#00ff41] text-sm"
          >
            {`> Transmission successful ✓`}
          </motion.div>
        )}
      </form>

      {/* Quick Links */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8b949e]">saurabh4442kumar@gmail.com</span>
          <button
            onClick={() => copyToClipboard('saurabh4442kumar@gmail.com')}
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <Copy size={14} />
          </button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8b949e]">github.com/Saurabh-singhx</span>
          <a
            href="https://github.com/Saurabh-singhx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8b949e]">linkedin.com/in/saurabh-kumar0</span>
          <a
            href="https://www.linkedin.com/in/saurabh-kumar0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="https://github.com/Saurabh-singhx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8b949e] hover:text-[#e6edf3] hover:scale-110 transition-all"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/saurabh-kumar0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8b949e] hover:text-[#e6edf3] hover:scale-110 transition-all"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </div>
  );
}
