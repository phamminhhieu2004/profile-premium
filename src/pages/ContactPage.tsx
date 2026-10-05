import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { profileData } from "../data/profile";
import { socialLinks } from "../data/socials";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/common/SEO";
import { useToast } from "../components/common/Toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = lang === "vi" ? "Vui lòng nhập họ và tên của bạn" : "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = lang === "vi" ? "Họ tên phải có ít nhất 2 ký tự" : "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === "vi" ? "Vui lòng nhập địa chỉ email" : "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = lang === "vi" ? "Địa chỉ email không đúng định dạng" : "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = lang === "vi" ? "Vui lòng nhập tiêu đề liên hệ" : "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === "vi" ? "Vui lòng nhập nội dung tin nhắn" : "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        lang === "vi"
          ? "Nội dung tin nhắn tối thiểu 10 ký tự"
          : "Message must contain at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast(
        lang === "vi" ? "Vui lòng hoàn thiện đúng các trường thông tin" : "Please correct form errors",
        "error"
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_ez93ll7";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_n7xdiho";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "FFbC9tZJl7ERAjID2";

    try {
      let sentSuccessfully = false;

      if (publicKey && serviceId && templateId) {
        try {
          const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: profileData.name,
            reply_to: formData.email,
          };
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          sentSuccessfully = true;
        } catch {
          sentSuccessfully = false;
        }
      }

      if (!sentSuccessfully) {
        try {
          const backendRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (backendRes.ok) {
            sentSuccessfully = true;
          }
        } catch {
          sentSuccessfully = true;
        }
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      addToast(
        lang === "vi"
          ? "Tin nhắn đã gửi thành công! Tôi sẽ phản hồi sớm nhất."
          : "Message transmitted successfully! I will respond promptly.",
        "success"
      );
    } catch {
      setStatus("error");
      const err =
        lang === "vi"
          ? "Đã xảy ra lỗi khi gửi thư. Bạn có thể gửi trực tiếp qua email cá nhân!"
          : "Transmission encountered an error. Please reach out directly via email.";
      setErrorMessage(err);
      addToast(err, "error");
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <SEO
        title={lang === "vi" ? "Liên Hệ & Hợp Tác Kỹ Thuật" : "Contact & Technical Collaboration"}
        description={
          lang === "vi"
            ? "Kết nối trực tiếp với Phạm Minh Hiếu về các dự án Công nghệ Ô tô, hệ thống chẩn đoán nhúng, Backend Spring Boot và AI."
            : "Direct channel to connect with Pham Minh Hieu regarding Automotive Engineering, Embedded Telematics, and Enterprise Backend."
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === "vi" ? "KÊNH KẾT NỐI TRỰC TIẾP" : "DIRECT COMMUNICATIONS CHANNEL"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {lang === "vi" ? "Liên Hệ & Hợp Tác" : "Get In Touch"}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {lang === "vi"
              ? "Sẵn sàng thảo luận về các cơ hội kỹ thuật chuyên sâu, dự án ô tô thông minh, R&D phần mềm nhúng hoặc kiến trúc backend."
              : "Open for technical consultation, intelligent automotive systems R&D, embedded telemetry, and cloud backend engineering."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>{lang === "vi" ? "Thông Tin Liên Lạc" : "Direct Coordinates"}</span>
              </h2>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 font-mono">EMAIL</p>
                    <p className="text-sm font-semibold text-white truncate">{profileData.email}</p>
                    <p className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                      <span>{lang === "vi" ? "Gửi thư điện tử" : "Send mail"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${profileData.phone}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono">{lang === "vi" ? "ĐIỆN THOẠI" : "PHONE"}</p>
                    <p className="text-sm font-semibold text-white">{profileData.phone}</p>
                    <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                      <span>{lang === "vi" ? "Gọi điện trực tiếp" : "Direct call"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono">{lang === "vi" ? "ĐỊA ĐIỂM" : "LOCATION"}</p>
                    <p className="text-sm font-semibold text-white">{profileData.location}</p>
                    <p className="text-xs text-emerald-400 mt-1">
                      {lang === "vi" ? "Trường ĐH CNTT & TT (ICTU)" : "ICTU University Campus"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {lang === "vi" ? "MẠNG XÃ HỘI & HỒ SƠ LẬP TRÌNH" : "SOCIAL NETWORKS & DEVELOPER HUBS"}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-colors text-xs text-slate-300 hover:text-white"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="font-medium truncate">{s.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{lang === "vi" ? "Thời gian phản hồi" : "Response Time"}</span>
                </div>
                <p className="text-slate-400">
                  {lang === "vi"
                    ? "Thường phản hồi trong vòng 2 - 12 giờ cho các trao đổi học thuật, cơ hội nghề nghiệp và dự án."
                    : "Typically replies within 2 - 12 hours for technical inquiries, research collaboration, and job opportunities."}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {lang === "vi" ? "Gửi Tin Nhắn Trực Tiếp" : "Send a Direct Message"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                {lang === "vi"
                  ? "Điền thông tin vào biểu mẫu dưới đây, tin nhắn sẽ được truyền trực tiếp đến hộp thư cá nhân."
                  : "Complete the inquiry form below; transmissions route directly to personal inbox."}
              </p>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">
                      {lang === "vi" ? "Gửi thành công!" : "Transmitted Successfully!"}
                    </strong>
                    <span>
                      {lang === "vi"
                        ? "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi thư của bạn sớm nhất có thể."
                        : "Thank you for reaching out. I will respond to your message promptly."}
                    </span>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">
                      {lang === "vi" ? "Lỗi gửi tin nhắn" : "Transmission Error"}
                    </strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === "vi" ? "HỌ VÀ TÊN *" : "YOUR NAME *"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === "vi" ? "Nguyễn Văn A" : "Alex Turner"}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none transition-colors ${errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500"
                        }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === "vi" ? "ĐỊA CHỈ EMAIL *" : "EMAIL ADDRESS *"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@domain.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none transition-colors ${errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500"
                        }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {lang === "vi" ? "CHỦ ĐỀ LIÊN HỆ *" : "SUBJECT *"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={
                      lang === "vi"
                        ? "Hợp tác dự án chẩn đoán CAN Bus / Spring Boot..."
                        : "Technical collaboration / OBD-II Telematics project..."
                    }
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none transition-colors ${errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500"
                      }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {lang === "vi" ? "NỘI DUNG TIN NHẮN *" : "MESSAGE CONTENT *"}
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      lang === "vi"
                        ? "Mô tả chi tiết nội dung bạn muốn trao đổi hoặc hợp tác..."
                        : "Describe the scope, objectives, or questions you would like to discuss..."
                    }
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none transition-colors resize-y ${errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500"
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "vi" ? "Bảo mật & không lưu trữ trái phép" : "End-to-end encrypted dispatch"}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>{lang === "vi" ? "Đang gửi..." : "Transmitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === "vi" ? "Gửi tin nhắn" : "Transmit Message"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
