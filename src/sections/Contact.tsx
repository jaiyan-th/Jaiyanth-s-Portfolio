import { motion } from 'motion/react';
import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.message || 'Transmission failed.');
      }
    } catch (err) {
      setError('Connection interrupted. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-6 bg-white/[0.001]">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] text-neon-cyan uppercase tracking-[0.6em]"
          >
            Communication
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Initialize <span className="text-white/40">Contact</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side Info */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight">Let's build something <br />extraordinary.</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Whether you have a specific systems project in mind or just want to collaborate on AI and cloud technologies, feel free to broadcast a message.
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                className="flex items-center gap-3 p-3 text-xs rounded-xl bg-[#080808]/50 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-neon-cyan/5 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-all">
                  <Mail size={13} />
                </div>
                <div className="min-w-0">
                  <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono">Mail Route</div>
                  <div className="font-semibold text-white/95 truncate select-all">{PORTFOLIO_DATA.contact.email}</div>
                </div>
              </a>

              <div className="flex gap-2">
                {PORTFOLIO_DATA.contact.socials.map((social) => (
                  <button 
                    key={social.name}
                    onClick={() => window.open(social.url, '_blank')}
                    className="flex-1 py-2 rounded-lg border border-white/5 bg-white/[0.01] hover:border-neon-purple/30 hover:text-neon-purple text-[9px] font-mono uppercase tracking-widest text-white/50 transition-all duration-300 font-medium"
                  >
                    {social.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/60 backdrop-blur-md p-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-mono ml-0.5">Full Identifier</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-mono ml-0.5">Email Host</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-mono ml-0.5">Message Payload</label>
                  <textarea 
                    name="message"
                    required
                    rows={3}
                    placeholder="How can we collaborate?"
                    className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-300 resize-none font-light"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-[8px] uppercase tracking-widest font-mono text-center">
                    Error: {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitted || isSending}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neon-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"
                        />
                        <span>Transmitting...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 size={13} />
                        <span>Message Transmitted</span>
                      </>
                    ) : (
                      <>
                        <span>Broadcast Message</span>
                        <Send size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-20 pt-6 border-t border-white/5 text-center">
        <div className="font-mono text-[8px] text-white/15 uppercase tracking-[0.8em]">
          &copy; 2026 Portfolio of Jaiyanth B
        </div>
      </div>
    </section>
  );
};

