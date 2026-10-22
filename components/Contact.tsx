'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

export default function Contact(): React.JSX.Element {
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
        error: 'Please fill in your name, email, and transmission message.',
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
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] animate-pulse" />
            <span>COMMUNICATIONS DECK // SUBSPACE TRANSMISSION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Initiate <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Transmission</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Have a project in mind, an architectural challenge, or looking to scale your engineering team? Transmit your brief below.
          </p>
        </div>

        {/* Form and Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coordinates Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#CBACF9]/10 border border-[#CBACF9]/30 flex items-center justify-center text-[#CBACF9] text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-slate-400 uppercase">Primary Coordinate</div>
                    <a
                      href="mailto:adekunlequadri3@gmail.com"
                      className="font-display font-semibold text-sm sm:text-base text-white hover:text-[#00DFD8] transition-colors no-underline"
                    >
                      adekunlequadri3@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    copiedEmail
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-white/5 border-[#CBACF9]/20 text-[#CBACF9] hover:bg-white/10'
                  }`}
                >
                  {copiedEmail ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/20 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl">
                  <FaWhatsapp />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase">Instant Transmission</div>
                  <a
                    href="https://wa.me/2347042277326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors no-underline"
                  >
                    +234 704 227 7326
                  </a>
                </div>
              </div>
            </div>

            {/* Base Location Card */}
            <div className="p-6 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/20 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#00DFD8]/10 border border-[#00DFD8]/30 flex items-center justify-center text-[#00DFD8] text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase">Deployment Base</div>
                  <div className="font-display font-semibold text-sm sm:text-base text-white">
                    Lagos, Nigeria (Worldwide Remote)
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Reply Verification Note */}
            <div className="p-5 rounded-2xl bg-[#CBACF9]/5 border border-dashed border-[#CBACF9]/25">
              <div className="font-mono text-xs text-[#00DFD8] uppercase tracking-wider mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8]" />
                Auto-Reply Transmission
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Submitting this terminal triggers a dual transmission: a direct notification to Quadri and an instant automated verification to your inbox.
              </p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0d0826]/85 backdrop-blur-2xl border border-[#CBACF9]/25 shadow-2xl shadow-purple-950/40"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-[#CBACF9] uppercase tracking-wider mb-2">
                    Your Identity *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Elena Rostova"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#CBACF9]/20 text-white font-sans text-sm focus:outline-none focus:border-[#00DFD8] focus:shadow-[0_0_15px_rgba(0,223,216,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-[#CBACF9] uppercase tracking-wider mb-2">
                    Email Coordinate *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@galaxy.org"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#CBACF9]/20 text-white font-sans text-sm focus:outline-none focus:border-[#00DFD8] focus:shadow-[0_0_15px_rgba(0,223,216,0.25)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-xs text-[#CBACF9] uppercase tracking-wider mb-2">
                  Mission Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Next.js Architecture & Systems Contract"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#CBACF9]/20 text-white font-sans text-sm focus:outline-none focus:border-[#00DFD8] focus:shadow-[0_0_15px_rgba(0,223,216,0.25)] transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-[#CBACF9] uppercase tracking-wider mb-2">
                  Brief Transmission *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detail your requirements, project scope, or questions..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-[#CBACF9]/20 text-white font-sans text-sm focus:outline-none focus:border-[#00DFD8] focus:shadow-[0_0_15px_rgba(0,223,216,0.25)] transition-all resize-y leading-relaxed"
                />
              </div>

              {/* Status alerts */}
              {status.error && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-sm flex items-center gap-2.5">
                  <FaExclamationTriangle className="flex-shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {status.success && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2.5">
                  <FaCheck className="text-base flex-shrink-0" />
                  <div>
                    <strong>Transmission Received!</strong> Message dispatched to Quadri & automated confirmation sent to your inbox.
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-4 rounded-full font-display font-bold text-sm tracking-wider text-black bg-gradient-to-r from-[#CBACF9] via-[#8A2BE2] to-[#00DFD8] hover:shadow-[0_0_30px_rgba(0,223,216,0.4)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status.submitting ? (
                  <>
                    <FaSpinner className="animate-spin text-base" />
                    <span>Dispatched into Orbit...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>Launch Transmission</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
