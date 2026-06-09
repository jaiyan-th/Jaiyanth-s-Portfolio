import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Terminal, Sparkles, MessageCircle, RefreshCw, Minus, ChevronUp } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STARTER_PROMPTS = [
  { text: "🏫 B.Tech Academic Focus & CGPA", query: "Can you tell me about your college, major, and current CGPA?" },
  { text: "💡 Key Artificial Intelligence Projects", query: "What are your core engineering projects in AI/ML?" },
  { text: "📧 Best way to contact Jaiyanth", query: "How can I contact Jaiyanth B to discuss roles/internships?" }
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "👋 Hello from orbit! I am Jaiyanth's personal AI Assistant. Ask me anything about his engineering projects, technical stack, CGPA, or upcoming schedule!"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest response
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('college') || q.includes('school') || q.includes('education') || q.includes('major') || q.includes('cgpa') || q.includes('b.tech') || q.includes('vsb') || q.includes('academic') || q.includes('study')) {
      return `🎓 **[Academic Records]**
Here are the official academic parameters for **Jaiyanth B**:

* **Institution**: VSB Engineering College
* **Degree**: B.Tech in Computer Science & Business Systems (CSBS)
* **Graduation Term**: 2023 - 2027
* **Academic Standing**: **8.13 CGPA**

He has a strong foundation in both computer science topics and business systems, specializing in systems optimization and smart automation. Let me know if you would like to explore his technical capabilities!`;
    }
    
    if (q.includes('project') || q.includes('projects') || q.includes('work') || q.includes('portfolio') || q.includes('build') || q.includes('fake news') || q.includes('vault') || q.includes('upskill') || q.includes('car-rent')) {
      return `💡 **[Engineering Projects]**
Here are the core projects developed by **Jaiyanth B**:

1. **Fake News Detector**
   * *Stack*: Python (Flask), PostgreSQL, LLM APIs
   * *Details*: An intelligent NLP classification server validating textual claims and web article contents.

2. **Secure Document Vault**
   * *Stack*: FastAPI, SQLite, AES-GCM, Argon2
   * *Details*: High-security offline file encryption vault with encrypted memory streams and key hashing.

3. **Up-Skill AI**
   * *Stack*: Flask, PostgreSQL, OpenAI API
   * *Details*: Career advisor engine supporting resume analysis, skill mapping, and mock interview coaching.

4. **Car-Rent Platform**
   * *Stack*: Next.js, SQLite, JWT
   * *Details*: Secured car hire portal with delivery logistics and stateless JWT cookie authentication.

Would you like to examine any of these in detail?`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('mail') || q.includes('phone') || q.includes('call') || q.includes('reach') || q.includes('hire') || q.includes('social') || q.includes('github') || q.includes('linkedin')) {
      return `📧 **[Contact Channels]**
You can connect with **Jaiyanth B** directly through the following routes:

* **Direct Email**: [jaiyanthofficial@gmail.com](mailto:jaiyanthofficial@gmail.com)
* **Mobile Line**: [+91 93455 73281](tel:+919345573281)
* **Social Hubs**: 
  * [LinkedIn](https://linkedin.com/in/jaiyanth-b)
  * [GitHub](https://github.com/jaiyan-th)

Feel free to use the contact form at the bottom of the page to broadcast a message to his dashboard!`;
    }

    if (q.includes('skill') || q.includes('skills') || q.includes('stack') || q.includes('language') || q.includes('languages') || q.includes('python') || q.includes('react') || q.includes('typescript') || q.includes('java') || q.includes('database') || q.includes('sql') || q.includes('fastapi')) {
      return `🛠️ **[Technical Stack]**
**Jaiyanth B** possesses a multi-layered technical skill set:

* **Programming**: Python, Java, SQL, TypeScript, HTML/CSS
* **Web & Systems**: React, Next.js, Node.js, FastAPI, Flask, Express
* **Databases**: PostgreSQL, MySQL, SQLite
* **Specialized Core**: Machine Learning, Natural Language Processing (NLP), RAG, Cloud Integration

He is highly capable in developing secure backend architectures, smart data flows, and fluid frontend interfaces.`;
    }

    // Default general response
    return `👋 **[AI Assistant Response]**
Hi there! I am Jaiyanth's virtual workspace assistant. 

Since my connection to the neural API is currently in sandbox/offline mode, I can provide portfolio data locally:
* **Academic**: B.Tech CSBS student at VSB (8.13 CGPA).
* **Skills**: Python, React, TypeScript, FastAPI, Machine Learning, SQL.
* **Core Projects**: Fake News Detector, Secure Vault, Up-Skill AI.
* **Contact**: [jaiyanthofficial@gmail.com](mailto:jaiyanthofficial@gmail.com) / +919345573281.

What specific details or project metrics can I retrieve for you?`;
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = { role: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-8) // Send latest conversations to retain context
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        setMessages((prev) => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error(data.message || 'Malformed backend response');
      }
    } catch (err: any) {
      console.warn('API Fetch failed, using client-side fallback:', err);
      // Fallback local response generator
      const localResponse = generateLocalResponse(queryText);
      setMessages((prev) => [...prev, { role: 'model', text: localResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputVal);
  };

  // Safe lightweight markdown-like formatter to render bullet points, lists, bold notes, and backticks beautifully in pure JSX!
  const formatText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      // Check for code blocks / bullet headings / standard text formatting
      if (trimmed.startsWith('**[') && trimmed.endsWith(']**')) {
        return (
          <div key={idx} className="font-mono text-[9px] text-[#bc13fe] tracking-wider uppercase bg-[#bc13fe]/5 border border-[#bc13fe]/10 rounded px-2 py-0.5 my-1.5 w-fit">
            {trimmed.slice(3, -3)}
          </div>
        );
      }
      
      if (trimmed.startsWith('###')) {
        return <h4 key={idx} className="text-white font-bold text-xs uppercase mt-3 mb-1 tracking-wide">{trimmed.slice(3).trim()}</h4>;
      }
      
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const itemText = trimmed.substring(1).trim();
        return (
          <div key={idx} className="flex items-start gap-1.5 pl-2.5 my-1 text-white/80">
            <span className="text-neon-cyan select-none">•</span>
            <span>{parseInlines(itemText)}</span>
          </div>
        );
      }
      
      return (
        <p key={idx} className="my-1.5 leading-relaxed text-white/85 text-justify">
          {parseInlines(line)}
        </p>
      );
    });
  };

  // Small helper to parse inner characters: backticks for `code` and asterisks for **bold**
  const parseInlines = (text: string) => {
    // Regex parsing for simple **bold** and `code` tags
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <b key={index} className="text-neon-cyan font-bold leading-normal">{part.slice(2, -2)}</b>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#bc13fe] font-mono leading-none">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating launcher trigger circle */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[2000] flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }}
              className="w-11 h-11 rounded-full bg-neon-purple text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-[0_0_20px_rgba(188,19,254,0.4)] group overflow-hidden border border-neon-purple/50 select-none"
              title="Launch AI Companion"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <MessageCircle className="w-5 h-5 z-10 text-white pointer-events-none" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Minimized bottom-right widget bar */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-72 h-14 rounded-xl glass-dark border border-white/10 z-[2010] shadow-[0_0_30px_rgba(188,19,254,0.15)] flex items-center justify-between px-4 cursor-pointer hover:border-neon-purple/30 transition-all duration-300 select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white leading-none">
                  JB-Agent <span className="text-[9px] font-mono text-neon-purple">v2.1</span>
                </h3>
                <span className="text-[7px] font-mono text-neon-cyan tracking-wider uppercase">Minimized</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                title="Expand Chat"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat window expansion */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-48px)] sm:w-[440px] h-[600px] rounded-2xl glass-dark border border-white/10 z-[2010] shadow-[0_0_50px_rgba(188,19,254,0.18)] flex flex-col overflow-hidden"
          >
            {/* Top border animated glow line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-blue" />

            {/* Header section with telemetry and minimize / close buttons */}
            <div className="p-4 bg-black/60 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    JB-Agent <span className="text-[9px] font-mono text-neon-purple">v2.1</span>
                  </h3>
                  <div className="flex items-center gap-1 text-[8px] font-mono text-neon-cyan tracking-[0.05em] uppercase">
                    <span className="w-1 h-1 rounded-full bg-neon-cyan animate-pulse" />
                    Online Cognitive Matrix
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors cursor-pointer"
                  title="Minimize Chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Log scroll feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs no-scrollbar bg-black/35 select-text">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-xl p-3 border ${
                    msg.role === 'user' 
                      ? 'bg-neon-cyan/5 border-neon-cyan/25 text-white' 
                      : 'bg-white/[0.02] border-white/10 text-white/90'
                    }`}
                  >
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.01] border border-white/5 max-w-[85%] rounded-xl p-4 text-white/50 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-neon-purple animate-spin" />
                    <span className="font-mono text-[9px] uppercase tracking-widest">Compiling prompt matrix...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion block pills - displayed only when input is vacant to prevent layout clutter */}
            <AnimatePresence>
              {!inputVal && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2 border-t border-white/[0.03] bg-black/45 space-y-1.5"
                >
                  <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest pl-0.5">Prompt suggestions:</div>
                  <div className="flex flex-col gap-1">
                    {STARTER_PROMPTS.map((prompt, ind) => (
                      <button
                        key={ind}
                        onClick={() => sendQuery(prompt.query)}
                        className="text-[10px] text-left text-white/60 hover:text-neon-cyan font-light bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-neon-cyan/20 px-2.5 py-1 rounded transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer"
                      >
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text entering submission form */}
            <form 
              onSubmit={handleFormSubmit}
              className="p-3 bg-black/70 border-t border-white/5 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask model about skills, code, CGPA..."
                disabled={isLoading}
                className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#0b0b0b]/90 border border-white/15 focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/10 transition-all rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="w-8 h-8 rounded-lg bg-neon-purple text-black flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-[0_0_10px_rgba(188,19,254,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
