import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE } from "@/data/profile";
import { SKILLS } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import { CERTIFICATES } from "@/data/certificates";
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const AIChatbot: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const initialWelcomeMessage = t("chatbot.welcome");

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: initialWelcomeMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [language, initialWelcomeMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 250);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "cleared-welcome",
        sender: "bot",
        text: language === "vi" 
          ? "Đoạn hội thoại đã được làm mới. Hãy đặt bất kỳ câu hỏi nào về Phạm Minh Hiếu!" 
          : "Conversation refreshed. Ask anything about Pham Minh Hieu!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const getKnowledgeResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("gemini") || q.includes("chứng chỉ") || q.includes("certificate") || q.includes("bằng cấp")) {
      const cert = CERTIFICATES.find((c) => c.id === "google-gemini-certified");
      if (language === "vi") {
        return `🏆 **Chứng chỉ Google Gemini Certified Professional**\n\nPhạm Minh Hiếu đã xuất sắc đạt chứng chỉ chuyên môn cao cấp **Google Gemini Certified Professional** (Mã xác thực: \`${cert?.credentialId || "G-GEMINI-AI-2024-PMH"}\`) do Google AI & DeepMind cấp ngày 15/10/2024.\n\nChứng chỉ công nhận năng lực làm chủ mô hình tạo sinh đa phương thức (Multimodal Generative AI), Prompt Engineering nâng cao và xây dựng các tác tử AI trong lĩnh vực kỹ thuật kỹ thuật số. Bạn có thể xem hình ảnh và chi tiết chứng chỉ tại trang **Chứng chỉ** trên website!`;
      } else {
        return `🏆 **Google Gemini Certified Professional**\n\nPham Minh Hieu earned the prestigious **Google Gemini Certified Professional** credential (Verification ID: \`${cert?.credentialId || "G-GEMINI-AI-2024-PMH"}\`) issued by Google AI & DeepMind on Oct 15, 2024.\n\nIt certifies production mastery in Google's Gemini multimodal foundation models, agentic workflows, and generative engineering. You can explore the full high-resolution certificate in the **Certificates** showroom on this site!`;
      }
    }

    if (q.includes("học vấn") || q.includes("trường") || q.includes("university") || q.includes("school") || q.includes("ngành")) {
      if (language === "vi") {
        return `🎓 **Học vấn của Phạm Minh Hiếu:**\n\n- **Trường:** Trường Đại học Công nghệ Thông tin và Truyền thông (ICTU) - Thái Nguyên.\n- **Chuyên ngành:** Công nghệ Kỹ thuật Ô tô (Khóa 2022 - Hiện tại).\n- **Định hướng chuyên sâu:** Cơ điện tử ô tô, giao thức chẩn đoán OBD-II, lập trình điều khiển ECU, công nghệ xe điện (EV)/Hybrid kết hợp phát triển phần mềm Backend & AI.\n- **Thời phổ thông:** Lớp CBA5, Trường THPT Phổ Yên (2019 - 2022).`;
      } else {
        return `🎓 **Academic Background of Pham Minh Hieu:**\n\n- **University:** University of Information and Communication Technology (ICTU), Thai Nguyen, Vietnam.\n- **Major:** Automotive Engineering Technology (2022 - Present).\n- **Focus Areas:** Vehicle mechatronics, OBD-II telemetry protocols, ECU calibration, EV/Hybrid powertrains coupled with distributed Backend and AI systems.\n- **High School:** Class CBA5, Pho Yen High School (2019 - 2022).`;
      }
    }

    if (q.includes("kỹ năng") || q.includes("skill") || q.includes("công nghệ") || q.includes("stack") || q.includes("backend")) {
      if (language === "vi") {
        return `⚡ **Kỹ năng chuyên môn chính của Hiếu:**\n\n1. **Kỹ thuật Ô tô:** Hệ thống động cơ & truyền lực (88%), Chẩn đoán ECU & OBD-II (85%), Công nghệ xe điện EV & Hybrid (82%), Thiết kế CAD cơ khí.\n2. **Backend & Cloud:** Spring Boot (95% - Microservices, Spring Security, JPA), FastAPI (90% - Async Python, WebSockets), Node.js & Express (85%), Docker.\n3. **Trí tuệ nhân tạo (AI):** Google Gemini AI (92% - Generative AI, RAG, Prompt Engineering), TensorFlow (90% - Deep Learning, CNN, nhận diện âm thanh rung động).\n4. **Frontend:** React.js, TypeScript, Tailwind CSS.`;
      } else {
        return `⚡ **Core Technological Competencies:**\n\n1. **Automotive Engineering:** Vehicle Powertrain Mechanics (88%), ECU & OBD-II Diagnostics (85%), EV & Hybrid Tech (82%), Parametric CAD.\n2. **Backend & Systems:** Spring Boot (95% - Microservices, Spring Security, JPA), FastAPI (90% - Async Python, WebSockets), Node.js (85%), Docker.\n3. **Artificial Intelligence:** Google Gemini AI (92% - Multimodal, Agentic Pipelines), TensorFlow (90% - Acoustic frequency spectrograms, CNNs).\n4. **Frontend:** React.js, TypeScript, Tailwind CSS.`;
      }
    }

    if (q.includes("dự án") || q.includes("project") || q.includes("telemetry") || q.includes("obd")) {
      if (language === "vi") {
        return `🚀 **Các dự án nổi bật của Phạm Minh Hiếu:**\n\n1. **Profile Premium Showcase:** Nền tảng portfolio cá nhân cao cấp tích hợp AI Chatbot, dữ liệu thời tiết thực và showroom công nghệ ô tô.\n2. **Hệ Thống Đo Từ Xa OBD-II Ô Tô (FastAPI, Python, WebSocket):** Thu thập và stream dữ liệu vòng tua RPM, tốc độ, nhiệt độ nước làm mát và mã lỗi DTC thời gian thực với độ trễ dưới 100ms.\n3. **Chẩn Đoán Lỗi Động Cơ Bằng AI (TensorFlow):** Huấn luyện mạng tích chập CNN phân tích phổ âm thanh và rung động để nhận diện sớm hư hỏng cơ khí trong xilanh.\n4. **Backend Quản Trị Đội Xe (Spring Boot 3, Redis, PostgreSQL):** Kiến trúc Microservices xử lý hơn 2,000 requests/giây cho hệ thống giám sát viễn thông ô tô.`;
      } else {
        return `🚀 **Featured Projects by Pham Minh Hieu:**\n\n1. **Profile Premium Showcase:** Interactive personal portfolio with embedded AI assistant, real-time meteorology telemetry, and automotive design system.\n2. **Real-Time OBD-II Telemetry Hub (FastAPI, WebSockets, CAN):** Sub-100ms streaming of vehicular PIDs, RPM, thermal metrics, and DTC trouble codes.\n3. **Engine Acoustic Fault Diagnostics with AI (TensorFlow, CNN):** Deep learning spectral anomaly detection across engine sound frequencies.\n4. **Fleet Telematics Microservices Backend (Spring Boot 3, Redis, PostgreSQL):** High-throughput distributed architecture handling 2,000+ requests/sec.`;
      }
    }

    if (q.includes("liên hệ") || q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("sđt") || q.includes("telegram")) {
      if (language === "vi") {
        return `📬 **Thông tin liên hệ trực tiếp với Phạm Minh Hiếu:**\n\n- **Số điện thoại / Zalo:** \`${PROFILE.phone}\`\n- **Email:** \`${PROFILE.email}\`\n- **Telegram:** [\`${PROFILE.telegram}\`](${PROFILE.telegramUrl})\n- **GitHub:** [\`phamminhhieu2004\`](${PROFILE.github})\n- **Facebook:** [\`Pham Minh Hieu\`](${PROFILE.facebook})\n- **TikTok:** [\`@goodboy.real_2004\`](${PROFILE.tiktok})\n- **Địa chỉ:** ${PROFILE.location}\n\nBạn cũng có thể gửi tin nhắn ngay tại trang **Liên hệ** thông qua biểu mẫu có sẵn!`;
      } else {
        return `📬 **Direct Contact Information:**\n\n- **Phone / Zalo:** \`${PROFILE.phone}\`\n- **Email:** \`${PROFILE.email}\`\n- **Telegram:** [\`${PROFILE.telegram}\`](${PROFILE.telegramUrl})\n- **GitHub:** [\`phamminhhieu2004\`](${PROFILE.github})\n- **Facebook:** [\`Pham Minh Hieu\`](${PROFILE.facebook})\n- **TikTok:** [\`@goodboy.real_2004\`](${PROFILE.tiktok})\n- **Location:** ${PROFILE.location}\n\nYou can also dispatch an instant message via the **Contact** page form!`;
      }
    }

    if (q.includes("cv") || q.includes("resume") || q.includes("tải")) {
      if (language === "vi") {
        return `📄 **Hồ sơ lý lịch / CV của Phạm Minh Hiếu:**\n\nBạn có thể tải trực tiếp file văn bản chính thức tại liên kết sau: [Tải Pham_Minh_Hieu_CV.txt](/Pham_Minh_Hieu_CV.txt) hoặc truy cập mục **Hồ sơ** trên thanh điều hướng để xem chi tiết toàn bộ quá trình học tập và kinh nghiệm!`;
      } else {
        return `📄 **Curriculum Vitae / Resume:**\n\nYou can download the formal resume text file directly here: [Download Pham_Minh_Hieu_CV.txt](/Pham_Minh_Hieu_CV.txt) or visit the **Resume** section in the navigation bar to inspect the complete academic and technical timeline!`;
      }
    }

    // Default contextual response
    if (language === "vi") {
      return `Chào bạn! Tôi đã ghi nhận câu hỏi: "${query}".\n\nTôi là trợ lý AI được cá nhân hóa cho hồ sơ của **Phạm Minh Hiếu** (Kỹ sư Công nghệ Ô tô & Lập trình viên Backend AI). Bạn có thể hỏi tôi về:\n- 🎓 **Học vấn:** Trường ICTU, chuyên ngành Công nghệ Ô tô\n- ⚡ **Kỹ năng:** Spring Boot, FastAPI, Node.js, TensorFlow, OBD-II\n- 🏆 **Chứng chỉ:** Google Gemini Certified Professional, ICAE Automotive Diagnostics\n- 🚀 **Dự án:** Telemetry ô tô, phân tích âm thanh AI, backend microservices\n- 📬 **Liên hệ:** SĐT \`${PROFILE.phone}\`, Telegram \`${PROFILE.telegram}\`\n\nHãy cho tôi biết bạn quan tâm đến phần nào nhé!`;
    } else {
      return `Hello! I noted your inquiry: "${query}".\n\nI am the specialized AI assistant for **Pham Minh Hieu** (Automotive Engineer & Backend AI Developer). Feel free to ask about:\n- 🎓 **Education:** ICTU University, Automotive Engineering Technology\n- ⚡ **Skills:** Spring Boot, FastAPI, Node.js, TensorFlow, OBD-II\n- 🏆 **Certifications:** Google Gemini Certified Professional, ICAE Diagnostics\n- 🚀 **Projects:** Vehicle Telemetry Hub, AI Engine Acoustics, Microservices\n- 📬 **Contact:** Phone \`${PROFILE.phone}\`, Telegram \`${PROFILE.telegram}\`\n\nLet me know which topic you'd like to explore!`;
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the AI Assistant on the portfolio of Pham Minh Hieu (born 2004 in Thai Nguyen, Vietnam, studying Automotive Engineering Technology at ICTU, expert in Spring Boot, FastAPI, Node.js, TensorFlow, and Google Gemini Certified). Respond in ${language === "vi" ? "Vietnamese" : "English"}. Be friendly, concise, and professional.`;
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${trimmed}` }],
                },
              ],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            setMessages((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2, 9),
                sender: "bot",
                text: reply,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
            setIsTyping(false);
            return;
          }
        }
      } catch (err) {
        // Fallback to backend or Knowledge Engine below
      }
    }

    // Try backend /api/chat endpoint if available
    try {
      const backendRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      if (backendRes.ok) {
        const data = await backendRes.json();
        if (data?.reply) {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              sender: "bot",
              text: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Backend not reached, fall back to offline Knowledge Engine
    }

    // Intelligent Offline Knowledge Engine Fallback
    setTimeout(() => {
      const response = getKnowledgeResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender: "bot",
          text: response,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFormattedText = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\`.*?\`|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono text-[11px] border border-cyan-800/40"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const textMatch = part.match(/\[(.*?)\]/);
        const urlMatch = part.match(/\((.*?)\)/);
        if (textMatch && urlMatch) {
          return (
            <a
              key={index}
              href={urlMatch[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300 inline-flex items-center gap-0.5 font-medium"
            >
              {textMatch[1]}
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition-all ${
            isOpen
              ? "bg-slate-800 text-white border border-slate-700 shadow-slate-900/60"
              : "bg-gradient-to-tr from-cyan-500 via-cyan-400 to-blue-500 text-slate-950 shadow-cyan-500/40"
          }`}
          aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot AI"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Expandable Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[82vh] rounded-2xl bg-slate-900/95 dark:bg-dark-card/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Bot className="w-5 h-5 text-slate-950" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-white tracking-wide flex items-center gap-1.5">
                    {t("chatbot.title")}
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h3>
                  <p className="text-[11px] text-cyan-400 font-mono leading-none">
                    {t("chatbot.subtitle")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  title={t("chatbot.clear")}
                  aria-label={t("chatbot.clear")}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  aria-label="Đóng chatbot"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 shadow-md whitespace-pre-wrap leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none font-medium"
                        : "bg-slate-950/70 border border-slate-800 text-slate-200 rounded-tl-none font-normal"
                    }`}
                  >
                    <div>{renderFormattedText(msg.text)}</div>
                    <div
                      className={`text-[9px] font-mono mt-1 ${
                        msg.sender === "user" ? "text-cyan-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-300 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2 rounded-2xl rounded-tl-none bg-slate-950/70 border border-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length <= 2 && (
              <div className="px-3.5 py-2 border-t border-slate-800/60 bg-slate-950/30 flex gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
                <button
                  onClick={() => {
                    setInput(t("chatbot.quick1"));
                    setTimeout(() => handleSend(), 50);
                  }}
                  className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 whitespace-nowrap transition-colors"
                >
                  🎓 {t("chatbot.quick1")}
                </button>
                <button
                  onClick={() => {
                    setInput(t("chatbot.quick2"));
                    setTimeout(() => handleSend(), 50);
                  }}
                  className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 whitespace-nowrap transition-colors"
                >
                  🏆 {t("chatbot.quick2")}
                </button>
                <button
                  onClick={() => {
                    setInput(t("chatbot.quick3"));
                    setTimeout(() => handleSend(), 50);
                  }}
                  className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 whitespace-nowrap transition-colors"
                >
                  ⚡ {t("chatbot.quick3")}
                </button>
              </div>
            )}

            {/* Input area */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 max-h-24 min-h-[38px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none font-sans leading-relaxed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
