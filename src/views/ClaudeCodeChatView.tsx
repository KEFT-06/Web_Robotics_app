import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Terminal, Code2, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/src/lib/LanguageContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ClaudeCodeChatView() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t(
        "👋 Bonjour! Je suis l'assistant **Claude Code** intégré à l'environnement OpenRouter.\\n\\nJe suis prêt à vous aider à écrire du code, analyser vos données système ou automatiser vos tâches de manière contextuelle.\\n\\n*Comment puis-je vous aider aujourd'hui?*",
        "👋 Hello! I am the **Claude Code** assistant integrated via OpenRouter.\\n\\nI am ready to help you write code, analyze system data, or automate contextual tasks.\\n\\n*How can I help you today?*"
      )
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/claude/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to chat with Claude');
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**Error:** ${err.message}`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto h-[calc(100vh-60px)] md:h-screen relative font-sans flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 shrink-0 flex items-center justify-between"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97757] mb-2 block flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> API OPENROUTER (Anthropic)
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight flex items-center gap-4">
            <Terminal className="w-10 h-10 text-[#D97757]" />
            {t("Claude Code", "Claude Code")}
          </h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">
            {t("Interface de développement agentique connectée au projet.", "Agentic development interface connected to the project.")}
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 glass-panel rounded-[2rem] flex flex-col overflow-hidden border border-glass-border/40"
      >
        {/* Chat Header */}
        <div className="h-14 border-b border-glass-border bg-black/20 flex items-center px-6 shrink-0 gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <div className="ml-4 font-mono text-xs text-text-muted tracking-widest uppercase flex items-center gap-2">
            <Code2 className="w-4 h-4" /> claude-3.5-sonnet
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                msg.role === 'assistant' 
                  ? 'bg-[#D97757]/10 border-[#D97757]/20 text-[#D97757]' 
                  : 'bg-glass-bg border-glass-border text-text-muted'
              }`}>
                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`rounded-2xl p-5 ${
                msg.role === 'assistant' 
                  ? 'bg-[#151515] border border-glass-border text-text-main/90' 
                  : 'bg-[#D97757]/10 border border-[#D97757]/20 text-white'
              }`}>
                <div className="markdown-body prose prose-invert max-w-none text-sm font-sans [&>pre]:bg-black [&>pre]:border [&>pre]:border-glass-border [&>pre]:rounded-xl">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border bg-[#D97757]/10 border-[#D97757]/20 text-[#D97757]">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="rounded-2xl p-5 bg-[#151515] border border-glass-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-glass-border shrink-0">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim()) handleSubmit(e);
                  }
                }}
                placeholder={t("Saisissez votre prompt pour Claude Code...", "Type your prompt for Claude Code...")}
                className="w-full bg-[#0A0A0F] border border-glass-border rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-[#D97757]/50 text-text-main resize-none min-h-[60px] max-h-[200px]"
                rows={1}
                style={{ overflowY: inputValue.split('\\n').length > 1 ? 'auto' : 'hidden' }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-[#D97757] text-white flex items-center justify-center hover:bg-[#D97757]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 -ml-1" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-text-muted font-mono">
              Claude Code via OpenRouter API • {t("Entrée pour envoyer, Maj+Entrée pour un saut de ligne", "Enter to send, Shift+Enter for new line")}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
