'use client';

import React, { useState } from 'react';
import { BIO_DATA } from '@/lib/portfolio-data';
import { 
  FaPaperPlane, 
  FaEnvelope, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaCopy, 
  FaCheck, 
  FaExclamationTriangle,
  FaSpinner,
  FaSatelliteDish
} from 'react-icons/fa';

interface ContactDimensionProps {
  onClose: () => void;
}

export default function ContactDimension({ onClose }: ContactDimensionProps): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BIO_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Please complete all required transmission fields.',
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
        throw new Error(data.error || 'Transmission failed. Direct email available.');
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
        error: (err as Error).message || 'Quantum transmission dropped. Please reach via direct email or WhatsApp.',
      });
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto p-4 sm:p-6 lg:p-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 text-base shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <FaSatelliteDish />
          </div>
          <div>
            <div className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
              SECTOR: 05 // THE QUANTUM TRANSMITTER
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
              Initiate Direct Transmission
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ENCRYPTED COMM LINE ACTIVE</span>
        </div>
      </div>

      {/* Main Form and Coordinates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Signal Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-black/65 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg">
                <FaEnvelope />
              </div>
              <div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Primary Comm Address
                </div>
                <a
                  href={`mailto:${BIO_DATA.email}`}
                  className="font-mono text-xs text-white hover:text-emerald-400 transition-colors no-underline"
                >
                  {BIO_DATA.email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy Email"
              className="p-2.5 rounded-xl bg-white/5 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
            >
              {copiedEmail ? <FaCheck /> : <FaCopy />}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-black/65 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl">
              <FaWhatsapp />
            </div>
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                Instant WhatsApp Link
              </div>
              <a
                href={BIO_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white hover:text-emerald-400 transition-colors no-underline"
              >
                {BIO_DATA.whatsapp}
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/65 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg">
              <FaMapMarkerAlt />
            </div>
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                Geographic Coordinates
              </div>
              <div className="font-mono text-xs text-white">
                {BIO_DATA.location}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed font-mono">
            &gt; Transmissions dispatched through this terminal trigger direct push notification to Quadri Adekunle with automatic delivery confirmation.
          </div>
        </div>

        {/* Right Column: Terminal Transmission Form */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black/70 border border-emerald-500/40 backdrop-blur-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dim-name" className="block font-mono text-xs text-emerald-400 font-bold uppercase mb-1.5">
                  Sender Identity *
                </label>
                <input
                  id="dim-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Commander Sarah Vance"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label htmlFor="dim-email" className="block font-mono text-xs text-emerald-400 font-bold uppercase mb-1.5">
                  Return Frequency (Email) *
                </label>
                <input
                  id="dim-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@orbital.org"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dim-subject" className="block font-mono text-xs text-emerald-400 font-bold uppercase mb-1.5">
                Transmission Subject
              </label>
              <input
                id="dim-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Enterprise Full-Stack Architecture Contract"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="dim-message" className="block font-mono text-xs text-emerald-400 font-bold uppercase mb-1.5">
                Transmission Payload (Message) *
              </label>
              <textarea
                id="dim-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Outline your systems engineering goals, timeline, or inquiries..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400 resize-y"
              />
            </div>

            {status.error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500 text-red-300 text-xs flex items-center gap-2 font-mono">
                <FaExclamationTriangle />
                <span>{status.error}</span>
              </div>
            )}

            {status.success && (
              <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2.5 font-mono">
                <FaCheck className="text-emerald-400 text-sm" />
                <span>
                  <strong>Transmission Delivered.</strong> Acknowledgment sent to your inbox. Quadri will respond shortly.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-emerald-400 text-black hover:bg-emerald-300 hover:shadow-[0_0_25px_#10b981] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {status.submitting ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Encrypting & Transmitting Payload...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Broadcast Transmission</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
