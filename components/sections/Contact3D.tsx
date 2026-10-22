'use client';

import React, { useState } from 'react';
import { 
  FaPaperPlane, 
  FaEnvelope, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaCopy, 
  FaCheck, 
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

interface FormDataState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StatusState {
  submitting: boolean;
  success: boolean;
  error: string;
}

export default function Contact3D(): React.JSX.Element {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<StatusState>({
    submitting: false,
    success: false,
    error: '',
  });

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adekunlequadri3@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Please fill in your name, email, and message.',
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message.');
      }

      setStatus({
        submitting: false,
        success: true,
        error: '',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: (err as Error).message || 'An unexpected transmission error occurred. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 w-full max-w-5xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3 py-1 rounded-full uppercase">
          <span>GET IN TOUCH</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Let's Build Something <span className="text-[#915DFF]">Extraordinary</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Ready to kick off a project, build a high-performance web app, or explore technical consultancy? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Coordinates Column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email */}
          <div className="p-5 rounded-2xl bg-[#0B0B14]/90 border border-[#915DFF]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-[#915DFF] text-lg">
                <FaEnvelope />
              </div>
              <div>
                <div className="font-mono text-[10px] text-slate-400 uppercase">Primary Email</div>
                <a href="mailto:adekunlequadri3@gmail.com" className="font-mono text-xs text-white hover:text-[#915DFF] transition-colors no-underline">
                  adekunlequadri3@gmail.com
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email"
              className="p-2 rounded-lg bg-white/5 border border-[#915DFF]/30 text-[#915DFF] hover:bg-[#915DFF] hover:text-black transition-colors cursor-pointer"
            >
              {copiedEmail ? <FaCheck /> : <FaCopy />}
            </button>
          </div>

          {/* WhatsApp */}
          <div className="p-5 rounded-2xl bg-[#0B0B14]/90 border border-[#915DFF]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl">
              <FaWhatsapp />
            </div>
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase">WhatsApp Instant</div>
              <a
                href="https://wa.me/2347042277326"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white hover:text-emerald-400 transition-colors no-underline"
              >
                +234 704 227 7326
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="p-5 rounded-2xl bg-[#0B0B14]/90 border border-[#915DFF]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-[#915DFF] text-lg">
              <FaMapMarkerAlt />
            </div>
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase">Location</div>
              <div className="font-mono text-xs text-white">Lagos, Nigeria (Global Remote Ready)</div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 p-7 rounded-3xl bg-[#0B0B14]/95 border border-[#915DFF]/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name-3d" className="block font-mono text-xs text-[#915DFF] font-bold uppercase mb-1.5">
                  Your Name *
                </label>
                <input
                  id="name-3d"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Elena Rostova"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#915DFF]/25 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
                />
              </div>

              <div>
                <label htmlFor="email-3d" className="block font-mono text-xs text-[#915DFF] font-bold uppercase mb-1.5">
                  Your Email *
                </label>
                <input
                  id="email-3d"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="elena@galaxy.org"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#915DFF]/25 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject-3d" className="block font-mono text-xs text-[#915DFF] font-bold uppercase mb-1.5">
                Subject
              </label>
              <input
                id="subject-3d"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Next.js Systems Architecture Contract"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#915DFF]/25 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
              />
            </div>

            <div>
              <label htmlFor="message-3d" className="block font-mono text-xs text-[#915DFF] font-bold uppercase mb-1.5">
                Your Message *
              </label>
              <textarea
                id="message-3d"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project, timeline, or requirements..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#915DFF]/25 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF] resize-y"
              />
            </div>

            {/* Status Feedback */}
            {status.error && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500 text-red-300 text-xs flex items-center gap-2">
                <FaExclamationTriangle />
                <span>{status.error}</span>
              </div>
            )}

            {status.success && (
              <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                <FaCheck className="text-emerald-400 text-sm" />
                <span>
                  <strong>Message Sent!</strong> Notification dispatched to Quadri and auto-reply sent to your inbox.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#915DFF] text-black hover:bg-[#A273FF] hover:shadow-[0_0_20px_#915DFF] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {status.submitting ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
