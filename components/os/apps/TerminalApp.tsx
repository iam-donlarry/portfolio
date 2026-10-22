'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalAppProps {
  onOpenApp: (appId: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalApp({ onOpenApp }: TerminalAppProps): React.JSX.Element {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-[#915DFF] font-bold">QuadriOS Bash v2.6.0 (x86_64-orbital-cyber)</div>
          <div>Type <span className="text-[#915DFF] font-bold">help</span> to view available system commands.</div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response: React.ReactNode;

    switch (lower) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#915DFF] font-bold">Available Commands:</div>
            <div>• <span className="text-white font-bold">whoami</span> — Display operator biography and telemetry</div>
            <div>• <span className="text-white font-bold">projects</span> — List production projects matrix</div>
            <div>• <span className="text-white font-bold">skills</span> — Inspect technical arsenal & proficiencies</div>
            <div>• <span className="text-white font-bold">contact</span> — Open communication deck</div>
            <div>• <span className="text-white font-bold">resume</span> — Download Quadri Adekunle CV</div>
            <div>• <span className="text-white font-bold">open &lt;app&gt;</span> — Launch GUI window (about, projects, skills, services, contact)</div>
            <div>• <span className="text-white font-bold">clear</span> — Purge terminal log buffer</div>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="text-slate-300">
            <span className="text-white font-bold">Quadri Adekunle</span> — Full-Stack Systems Developer & UI/UX Artisan.
            <div className="text-xs text-slate-400">Education: HND Computer Science, Federal Polytechnic Ilaro</div>
            <div className="text-xs text-slate-400">Currently: Web Developer @ Baye Business Solutions</div>
          </div>
        );
        break;

      case 'projects':
      case 'matrix':
        response = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#915DFF] font-bold">Production Projects:</div>
            <div>1. SafetyBuddy — AI First-Aid Chatbot (Next.js, Gemini API)</div>
            <div>2. Gesture Connect — AI Sign Language Translator (React, MediaPipe)</div>
            <div>3. Alterverse Production — Agriculture Platform (HTML, CSS, JS, Bootstrap)</div>
            <div>4. Alterverse Construction — Infrastructure Portal (HTML, CSS, JS, Bootstrap)</div>
            <div>5. Al-Barakah — Ethical Business Platform (PHP, MySQL, JS)</div>
            <div>6. Stoke Marine — Maritime Logistics (HTML, CSS, JS)</div>
            <div>7. NextFlick — Cinema Explorer (React Native, TMDB API)</div>
            <div>8. ShelfAlert — Inventory Expiry Tracker (PHP, MySQL, JS)</div>
            <div className="text-xs text-slate-400 mt-1">Tip: Type `open projects` to launch the visual gallery.</div>
          </div>
        );
        break;

      case 'skills':
      case 'arsenal':
        response = (
          <div className="space-y-1 text-slate-300">
            <div><span className="text-[#915DFF] font-bold">Frontend:</span> React, Next.js (App Router), TypeScript, JavaScript (ES6+), Framer Motion, Tailwind CSS</div>
            <div><span className="text-[#915DFF] font-bold">Backend:</span> Node.js, Express, PHP, REST APIs, Vercel Serverless, Next.js Route Handlers</div>
            <div><span className="text-[#915DFF] font-bold">Databases:</span> MongoDB, MySQL, Relational Schema Architecture</div>
            <div><span className="text-[#915DFF] font-bold">AI & Tools:</span> Google Gemini API, MediaPipe Computer Vision, Git, PostCSS</div>
          </div>
        );
        break;

      case 'contact':
        onOpenApp('contact');
        response = (
          <div className="text-[#915DFF]">
            Opening Communications Deck... Or email directly: adekunlequadri3@gmail.com
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        {
          const link = document.createElement('a');
          link.href = '/documents/Quadri-Resume.pdf';
          link.download = 'Quadri-Resume.pdf';
          link.click();
          response = <div className="text-emerald-400">Dispatched download for Quadri-Resume.pdf!</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        if (lower.startsWith('open ')) {
          const target = lower.replace('open ', '').trim();
          if (['about', 'projects', 'skills', 'services', 'experience', 'contact'].includes(target)) {
            onOpenApp(target);
            response = <div className="text-[#915DFF]">Launching GUI application: {target}</div>;
          } else {
            response = <div className="text-red-400">Application not found: {target}. Available: about, projects, skills, services, contact</div>;
          }
        } else {
          response = (
            <div className="text-red-400">
              Command not recognized: `{cmd}`. Type `help` for command list.
            </div>
          );
        }
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div className="bg-[#04040A] rounded-xl p-4 font-mono text-xs text-white min-h-[360px] flex flex-col justify-between border border-[#915DFF]/25 shadow-inner">
      <div className="space-y-3 overflow-y-auto max-h-[460px]">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[#915DFF]">quadri@orbital:~$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-3 border-t border-[#915DFF]/20">
        <span className="text-[#915DFF] font-bold">quadri@orbital:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type command (e.g. help, projects, open contact)..."
          autoFocus
          className="flex-grow bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0"
        />
      </form>
    </div>
  );
}
