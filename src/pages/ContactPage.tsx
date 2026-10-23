import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          DIRECT STUDIO ACCESS · ONTARIO, CANADA
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Connect With Our Engineering Studio
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Whether you need a custom additive consultation, wholesale order inquiries, or technical support for your 3D printed accessories, our Ontario team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Info Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#0B0D14] rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white mb-2">Studio Coordinates</h2>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Ontario3Dprint Studio & Lab</strong>
                <span>Innovation Drive, Greater Toronto Area</span>
                <span className="block text-slate-500">Ontario, Canada</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Email Dispatch</strong>
                <a href="mailto:contact@ontario3dprint.ca" className="text-cyan-400 hover:underline">
                  contact@ontario3dprint.ca
                </a>
                <span className="block text-slate-500">Typical response within 2–4 hours</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Direct Voice / Technical Line</strong>
                <span>+1 (416) 800-3DPR (3377)</span>
                <span className="block text-slate-500">Eastern Time (ET)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Operating Hours</strong>
                <span>Monday – Friday: 8:00 AM – 6:00 PM EST</span>
                <span className="block text-slate-500">Closed statutory Canadian holidays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D0F17] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Transmitted</h3>
              <p className="text-slate-300 text-xs max-w-sm mx-auto mb-6">
                Thank you for reaching out, {name}. An Ontario3Dprint application specialist will respond directly to {email}.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-2">Direct Message to Engineering</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.ca"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="General Inquiry">General Product Inquiry</option>
                  <option value="Custom 3D Printing Quote">Custom 3D Printing & CAD Slicing</option>
                  <option value="Corporate / Wholesale Gifting">Corporate Batch Production</option>
                  <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist your project?"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-4 text-xs focus:border-cyan-500 focus:outline-none placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH MESSAGE TO STUDIO</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
