"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ArrowLeft 
} from "lucide-react";
import { sendMentorMessage } from "@/lib/api";

interface Message {
  id: string;
  sender: "user" | "mentor";
  text: string;
  time: string;
  isGemini?: boolean;
}

const PRESET_QUESTIONS = [
  "What skills should I learn for AI engineering?",
  "Why was AI / ML Engineer recommended as my #1 match?",
  "What degrees can I pursue after 12th PCM in Chennai?",
  "Is this career financially feasible for my family?",
  "What are my biggest skill gaps and how do I bridge them?",
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "mentor",
      text: "Hello Arun! I am your PRISM AI Career Mentor. I've reviewed your cognitive aptitude (91%), strong scores in Programming (92) and Math (89), and your family's ₹6,00,000 budget. Ask me anything about your STEAM roadmap, college exams, or skill preparation!",
      time: "Just now",
      isGemini: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isSending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInputValue("");
    setIsSending(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await sendMentorMessage(textToSend, 1, history);

      const mentorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        text: res.reply,
        time: "Just now",
        isGemini: res.is_gemini_generated,
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err) {
      console.warn("Mentor fallback response:", err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        text: "Based on PRISM's assessment, your profile shows exceptional analytical aptitude. For AI Engineering, focus on mastering Linear Algebra, Python, and PyTorch, which align with your regional tech hubs in Chennai and Bengaluru.",
        time: "Just now",
        isGemini: false,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Bot className="w-3.5 h-3.5 text-pink-400" />
            <span>Context-Grounded Career Advisor</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">PRISM AI Career Mentor</h1>
          <p className="text-xs text-rose-200/70">
            Ask questions grounded directly in your Career DNA, financial constraints, and market opportunities.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Student Dashboard</span>
        </Link>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-rose-200/70 uppercase tracking-wider">
          Suggested Inquiries:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs px-3 py-1.5 rounded-xl bg-[#140822] hover:bg-purple-950/60 border border-purple-900/40 hover:border-pink-500/50 text-rose-200/80 hover:text-white transition-all text-left"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-card rounded-2xl border border-purple-900/40 h-[500px] flex flex-col overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-gradient-to-r from-purple-600 via-pink-500 to-peach-400 text-white"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-1.5 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-none shadow-md shadow-pink-600/20"
                    : "bg-[#140822]/95 text-rose-100 border border-purple-900/40 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div
                  className={`flex items-center gap-1 text-[9px] ${
                    m.sender === "user" ? "text-rose-200 justify-end" : "text-rose-200/50"
                  }`}
                >
                  {m.sender === "mentor" && (
                    <span className="text-peach-400 flex items-center gap-0.5 font-medium">
                      <Sparkles className="w-2.5 h-2.5" />
                      {m.isGemini ? "Gemini Live API" : "PRISM Template Engine"}
                    </span>
                  )}
                  <span>• {m.time}</span>
                </div>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-950/80 flex items-center justify-center text-rose-200">
                <Bot className="w-4 h-4 text-pink-400" />
              </div>
              <div className="p-3 rounded-2xl bg-[#140822] border border-purple-900/40 text-xs text-rose-200/70 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                <span>Consulting PRISM knowledge engine...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-[#12071d] border-t border-purple-900/40 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about AI vs Data Science, scholarships, colleges in Tamil Nadu..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#190c29] border border-purple-900/60 text-xs text-white placeholder-rose-200/40 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isSending}
            className={`p-2.5 rounded-xl text-white transition-all ${
              inputValue.trim() && !isSending
                ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/30"
                : "bg-purple-950/50 text-rose-200/40 cursor-not-allowed border border-purple-900/40"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

