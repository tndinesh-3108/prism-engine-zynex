"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ArrowLeft,
  GitBranch
} from "lucide-react";
import { sendMentorMessage } from "@/lib/api";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

interface Message {
  id: string;
  sender: "user" | "mentor";
  text: string;
  time: string;
  isGemini?: boolean;
}

const PRESET_QUESTIONS = [
  "Why is AI / ML Engineer ranked as my #1 Match tier?",
  "How can I reach ₹32L+ LPA package right out of college?",
  "How does our family budget of ₹6L/year align with top B.Tech degrees?",
  "What math topics should I master in 12th PCM for machine learning?",
  "What is the difference between Safe, Match, and Reach tiers?",
];

export default function StudentMentorPage() {
  const { syncCode, parentParameters } = useStudentParentFlow();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "mentor",
      text: `Hello Arun! I am your PRISM AI Career Mentor. I've analyzed your cognitive Career DNA (91 Aptitude, 92 Programming, 89 Mathematics) and your family's ₹${(parentParameters.annualBudget / 100000).toFixed(1)}L annual budget parameters (Sync Code: ${syncCode}). Ask me anything about your 5-year roadmap, high-package placements, or exam prep!`,
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
      const res = await sendMentorMessage(textToSend, 1);
      const mentorReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        text: res.reply,
        time: "Just now",
        isGemini: res.is_gemini,
      };
      setMessages((prev) => [...prev, mentorReply]);
    } catch (err) {
      console.warn("AI mentor fallback:", err);
      setTimeout(() => {
        let reply = "Based on your PRISM profile, you have top-tier mathematical aptitude. For an AI Engineer targeting ₹32L+ packages, focusing on Data Structures in C++ during Year 1 and building end-to-end PyTorch models by Year 2 will make you a prime candidate for Day-1 campus recruitment.";
        if (textToSend.toLowerCase().includes("budget") || textToSend.toLowerCase().includes("cost")) {
          reply = `Your family budget of ₹${(parentParameters.annualBudget / 100000).toFixed(1)}L/year comfortably covers leading 4-Year B.Tech programs in Chennai and South India without exceeding your parent's loan tolerance.`;
        } else if (textToSend.toLowerCase().includes("safe") || textToSend.toLowerCase().includes("reach")) {
          reply = "Safe careers (like Data Systems Architect) have 100% budget fit and immense corporate hiring. Match careers (like AI/ML Engineer) align with your peak cognitive abilities. Reach careers (like Algorithmic Quant) offer ₹45L+ CTC but require extreme math rigor.";
        }
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "mentor",
            text: reply,
            time: "Just now",
            isGemini: false,
          },
        ]);
      }, 500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Bot className="w-3.5 h-3.5 text-pink-400" />
            <span>Autonomous Career Advisory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">AI Career Mentor</h1>
          <p className="text-xs text-rose-200/70">
            Real-time guidance contextualized by your Career DNA, PCM aptitude, and parent financial boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/student/roadmap"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-pink-400" />
            <span>Roadmap</span>
          </Link>
        </div>
      </div>

      {/* Preset Questions Horizontal Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider">
          Suggested Discussion Prompts:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-[11px] font-semibold whitespace-nowrap transition-colors text-left shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-card rounded-2xl border border-purple-500/30 h-[520px] flex flex-col overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gradient-to-tr from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                    : "bg-purple-950/60 text-rose-100 border border-purple-800/40"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-bold text-[10px] opacity-75">
                    {m.sender === "user" ? "Arun Kumar" : "PRISM AI Mentor"}
                  </span>
                  {m.isGemini && (
                    <span className="flex items-center gap-1 text-[9px] text-pink-300 font-semibold bg-pink-950/80 px-1.5 py-0.2 rounded border border-pink-700/50">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini Powered
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className="text-[9px] opacity-60 block text-right">{m.time}</span>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-xs flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-rose-200/80">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-purple-950/40 border-t border-purple-900/40 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about AI engineering, high-package careers, college exams, or scholarships..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/40 text-xs text-white placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isSending}
            className="p-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-md shadow-pink-600/30 transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
