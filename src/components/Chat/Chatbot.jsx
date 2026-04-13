import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, Minus, Search, ThumbsUp, ThumbsDown, Bookmark, Copy, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_ACTIONS = [
  { id: 'flights', label: 'Book a Flight', msg: "I'd like to book a flight." },
  { id: 'hotels', label: 'Find Hotels', msg: "Help me find a hotel." },
  { id: 'status', label: 'Check Status', msg: "Check my flight status." },
  { id: 'support', label: 'Support', msg: "I need help with my booking." },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "**Hi! I'm Myra**, your personal YatraLo travel assistant. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText) => {
    const textToSend = typeof messageText === 'string' ? messageText : input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();
      if (data.status) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection failed. Please check your network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      // Bold parsing
      let parts = line.split(/(\*\*.*?\*\*)/g);
      let elements = parts.map((part, pi) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pi} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <li key={i} className="ml-4 mb-2 list-disc flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
          <span>{elements.slice(1)}</span>
        </li>;
      }
      return <p key={i} className="mb-2">{elements}</p>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">
      
      {/* Search Bar Style Trigger (Image 1) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="mb-4 cursor-pointer bg-white border border-blue-400 rounded-full px-6 py-3 shadow-xl flex items-center justify-between gap-10 hover:shadow-2xl transition-all w-[300px]"
          >
             <span className="text-[13px] font-medium text-slate-500">What are you looking for?</span>
             <div className="flex items-center gap-1 text-blue-500">
                <Search size={18} />
                <Sparkles size={12} className="animate-pulse" />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="w-[450px] h-[85vh] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col border-l border-slate-100 relative overflow-hidden"
            style={{ borderRadius: '2rem 0 0 2rem' }}
          >
            {/* Header (Image 2 style) */}
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                   <div className="relative">
                      <MessageSquare size={18} className="text-slate-400" />
                      <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
                   </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Bookmark size={18} />
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-4">
                       <h4 className="font-black text-slate-800 text-lg">Myra</h4>
                       <Sparkles size={14} className="text-blue-500" />
                    </div>
                  )}
                  
                  <div className={`
                    max-w-[90%] text-[14px] leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-[1.5rem] rounded-tr-none px-6 py-3 shadow-lg shadow-blue-100' 
                      : 'text-slate-700'}
                  `}>
                    {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                  </div>

                  {msg.role === 'assistant' && !isLoading && (
                    <div className="flex items-center gap-4 mt-6 opacity-40 hover:opacity-100 transition-opacity">
                       <button className="hover:text-blue-600 transition-colors"><ThumbsUp size={16} /></button>
                       <button className="hover:text-blue-600 transition-colors"><ThumbsDown size={16} /></button>
                       <button className="hover:text-blue-600 transition-colors"><Bookmark size={16} /></button>
                       <button 
                        onClick={() => {
                          navigator.clipboard.writeText(msg.content);
                          alert("Copied to clipboard!");
                        }}
                        className="hover:text-blue-600 transition-colors"
                       >
                         <Copy size={16} />
                       </button>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="space-y-4">
                   <h4 className="font-black text-slate-800 text-lg">Myra</h4>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Overlay */}
            {!isLoading && messages.length <= 1 && (
              <div className="px-8 pb-4 flex flex-wrap gap-2">
                {QUICK_ACTIONS.map(a => (
                  <button 
                    key={a.id}
                    onClick={() => handleSend(a.msg)}
                    className="bg-slate-50 hover:bg-white hover:border-blue-200 border border-transparent px-4 py-2 rounded-full text-xs font-bold text-slate-500 transition-all"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area (Image 2 Style) */}
            <div className="p-8 bg-white border-t border-slate-50 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl px-6 py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all border border-transparent focus-within:border-blue-200 group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything"
                  className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="text-blue-500 hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
                >
                   <Send size={24} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                 <div className="h-px bg-slate-100 flex-1" />
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Powered by YatraLo Intelligence</span>
                 <div className="h-px bg-slate-100 flex-1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
