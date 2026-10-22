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

export default function ContactApp(): React.JSX.Element {
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
    <div className="space-y-6">
      {/* Coordinates Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Email */}
        <div className="p-3.5 rounded-xl bg-[#0B0B16] border border-[#915DFF]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FaEnvelope className="text-[#915DFF] text-lg" />
            <div>
              <div className="font-mono text-[9px] text-slate-400 uppercase">Primary Email</div>
              <a href="mailto:adekunlequadri3@gmail.com" className="font-mono text-xs text-white hover:text-[#915DFF]">
                adekunlequadri3@gmail.com
              </a>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            title="Copy Email"
            className="p-1.5 rounded bg-black/60 text-[#915DFF] hover:bg-[#915DFF] hover:text-black transition-colors"
          >
            {copiedEmail ? <FaCheck /> : <FaCopy />}
          </button>
        </div>

        {/* WhatsApp */}
        <div className="p-3.5 rounded-xl bg-[#0B0B16] border border-[#915DFF]/30 flex items-center gap-2.5">
          <FaWhatsapp className="text-[#915DFF] text-xl" />
          <div>
            <div className="font-mono text-[9px] text-slate-400 uppercase">WhatsApp Instant</div>
            <a
              href="https://wa.me/2347042277326"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white hover:text-[#915DFF]"
            >
              +234 704 227 7326
            </a>
          </div>
        </div>

        {/* Base */}
        <div className="p-3.5 rounded-xl bg-[#0B0B16] border border-[#915DFF]/30 flex items-center gap-2.5">
          <FaMapMarkerAlt className="text-[#915DFF] text-lg" />
          <div>
            <div className="font-mono text-[9px] text-slate-400 uppercase">Station Coordinate</div>
            <div className="font-mono text-xs text-white">Lagos, NG (Global Remote)</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 rounded-2xl bg-[#0B0B18] border border-[#915DFF]/40 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="os-contact-name" className="block font-mono text-xs text-[#915DFF] uppercase font-bold mb-1">
                Your Identity *
              </label>
              <input
                id="os-contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Connor"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-[#915DFF]/30 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
              />
            </div>

            <div>
              <label htmlFor="os-contact-email" className="block font-mono text-xs text-[#915DFF] uppercase font-bold mb-1">
                Email Coordinate *
              </label>
              <input
                id="os-contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sarah@resistance.io"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-[#915DFF]/30 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="os-contact-subject" className="block font-mono text-xs text-[#915DFF] uppercase font-bold mb-1">
              Mission Subject
            </label>
            <input
              id="os-contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Next.js Systems Architecture Inquiry"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-[#915DFF]/30 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
            />
          </div>

          <div>
            <label htmlFor="os-contact-message" className="block font-mono text-xs text-[#915DFF] uppercase font-bold mb-1">
              Brief Transmission *
            </label>
            <textarea
              id="os-contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Outline your project scope, questions, or timeline..."
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-[#915DFF]/30 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF] resize-y"
            />
          </div>

          {/* Status Alerts */}
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
                <strong>Transmission Sent!</strong> Direct notification dispatched to Quadri, and automated confirmation sent to your inbox.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={status.submitting}
            className="w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#915DFF] text-black hover:bg-[#A273FF] hover:shadow-[0_0_20px_#915DFF] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {status.submitting ? (
              <>
                <FaSpinner className="animate-spin text-sm" />
                <span>Transmitting Data...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Dispatch Transmission</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
