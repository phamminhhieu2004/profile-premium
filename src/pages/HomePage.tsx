import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE } from "@/data/profile";
import { SKILLS } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import { CERTIFICATES } from "@/data/certificates";
import { POSTS } from "@/data/posts";
import { SOCIAL_LINKS } from "@/data/socials";
import { SEO } from "@/components/common/SEO";
import { CertificateModal } from "@/components/widgets/CertificateModal";
import { CertificateItem } from "@/types";
import {
  Car,
  Code2,
  Send,
  FileText,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Typing effect for dual domains
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases =
    language === "vi"
      ? [
          "Kỹ sư Công nghệ Kỹ thuật Ô tô",
          "Lập trình viên Backend Spring Boot & FastAPI",
          "Chuyên gia Trí tuệ Nhân tạo Google Gemini Certified",
          "Nghiên cứu Hệ thống Đo từ xa & Chẩn đoán OBD-II",
        ]
      : [
          "Automotive Engineering Specialist",
          "Spring Boot & FastAPI Backend Developer",
          "Google Gemini Certified AI Professional",
          "OBD-II Vehicle Telemetry & Diagnostics Researcher",
        ];

  useEffect(() => {
    const currentPhrase = phrases[typingIndex % phrases.length];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTypingIndex((prev) => prev + 1);
      } else {
        setCurrentText(
          isDeleting
            ? currentPhrase.substring(0, currentText.length - 1)
            : currentPhrase.substring(0, currentText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingIndex, language, phrases]);

  const geminiCert = CERTIFICATES.find((c) => c.id === "google-gemini-certified") || CERTIFICATES[0];
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const latestPosts = POSTS.slice(0, 2);

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      <SEO
        title={language === "vi" ? "Trang Chủ" : "Home"}
        description={PROFILE.introShort[language]}
      />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Domain Badges */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/30 shadow-sm">
                <Car className="w-3.5 h-3.5" />
                <span>{t("hero.domain.auto")}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shadow-sm">
                <Code2 className="w-3.5 h-3.5" />
                <span>{t("hero.domain.software")}</span>
              </div>
            </motion.div>

            {/* Greeting & Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 dark:text-emerald-400 font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("hero.eyebrow")}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {t("hero.greeting")}{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  {PROFILE.name}
                </span>
              </h1>
              <div className="h-8 flex items-center font-mono text-sm sm:text-base text-cyan-600 dark:text-cyan-400 font-medium">
                <span className="text-slate-400 mr-2 font-mono">//</span>
                <span>{currentText}</span>
                <span className="w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {PROFILE.introShort[language]}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t("hero.cta.contact")}</span>
              </Link>

              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider bg-slate-200 dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-900 dark:text-slate-200 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{t("hero.cta.resume")}</span>
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <span>{t("hero.cta.projects")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social Channels Row */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">Connect:</span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all"
                    aria-label={item.ariaLabel}
                  >
                    <span className="text-xs font-mono">{item.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual, Avatar, Telemetry Floating Snippets */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-amber-500/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Avatar Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 bg-slate-100 dark:bg-dark-card p-3 shadow-2xl shadow-cyan-950/40">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-900">
                  <img
                    src="/assets/picture 2.jpg"
                    alt={PROFILE.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="font-heading font-bold text-base">{PROFILE.name}</p>
                      <p className="text-[11px] text-cyan-400 font-mono">ICTU • Thai Nguyen, VN</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                      2004
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Code Snippet Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden sm:block absolute -bottom-6 -left-6 z-20 p-3.5 rounded-xl bg-slate-900/95 dark:bg-dark-card/95 border border-cyan-500/30 shadow-xl shadow-black/50 backdrop-blur-md"
              >
                <div className="font-mono text-[11px] leading-relaxed text-slate-300 space-y-0.5">
                  <div className="text-slate-500">// system.telemetry</div>
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">stack</span> = &#123;
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-300">backend</span>:{" "}
                    <span className="text-emerald-400">&apos;SpringBoot&apos;</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-300">inference</span>:{" "}
                    <span className="text-emerald-400">&apos;FastAPI&apos;</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-300">domain</span>:{" "}
                    <span className="text-amber-400">&apos;Automotive&apos;</span>
                  </div>
                  <div>&#125;;</div>
                </div>
              </motion.div>

              {/* Floating Performance Metric Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden sm:block absolute -top-4 -right-4 z-20 p-3.5 rounded-xl bg-slate-900/95 dark:bg-dark-card/95 border border-slate-700 dark:border-dark-border shadow-xl shadow-black/50 backdrop-blur-md space-y-2 min-w-[170px]"
              >
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Spring Boot</span>
                    <span className="text-cyan-400 font-bold">95%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>FastAPI</span>
                    <span className="text-blue-400 font-bold">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Auto Tech</span>
                    <span className="text-amber-400 font-bold">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight: Google Gemini Certified Professional */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t("certificates.spotlight.badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {geminiCert.title[language]}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {geminiCert.description[language]}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ID: {geminiCert.credentialId}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{geminiCert.issueDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {geminiCert.skillsLearned.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs rounded-lg bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setSelectedCert(geminiCert)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <Award className="w-4 h-4" />
                  <span>{t("certificates.view")}</span>
                </button>

                <Link
                  to="/certificates"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  <span>{language === "vi" ? "Xem tất cả chứng chỉ" : "View all credentials"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Certificate Preview Card with Lightbox Trigger */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setSelectedCert(geminiCert)}
                className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-2 shadow-2xl cursor-pointer group transition-all hover:border-cyan-400 hover:scale-[1.02]"
              >
                <img
                  src={geminiCert.image}
                  alt={geminiCert.title[language]}
                  className="w-full h-auto rounded-xl object-contain"
                />
                <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs rounded-xl">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/90 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 border border-cyan-500/50 shadow-lg">
                    <Award className="w-4 h-4" />
                    <span>{t("certificates.view")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Domain Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-2">
            core.architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "vi" ? "Hai Trụ Cột Năng Lực" : "Two Core Competency Pillars"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            {language === "vi"
              ? "Sự đồng điệu giữa kỹ thuật cơ khí ô tô thực tiễn và tư duy kiến trúc phần mềm phân tán."
              : "The synchronized fusion between hands-on vehicle engineering and modern distributed software systems."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Automotive Domain Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-amber-500/30 shadow-lg hover:border-amber-400/60 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-5">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              {t("hero.domain.auto")}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {language === "vi"
                ? "Nghiên cứu sâu về cơ cấu động cơ đốt trong, hệ thống điều khiển điện tử ECU, chẩn đoán qua cổng OBD-II, giao thức truyền thông CAN bus và công nghệ xe điện hóa EV/Hybrid."
                : "Comprehensive study of powertrain mechanics, electronic ECU management, onboard OBD-II diagnostics, in-vehicle CAN network protocols, and next-generation EV/Hybrid systems."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["ECU Diagnostics", "CAN Bus", "OBD-II", "EV / Hybrid", "Powertrain"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Software Domain Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-cyan-500/30 shadow-lg hover:border-cyan-400/60 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              {t("hero.domain.software")}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {language === "vi"
                ? "Thiết kế và triển khai kiến trúc backend phân tán hiệu năng cao với Spring Boot, FastAPI, Node.js kết hợp huấn luyện mô hình Machine Learning trên TensorFlow và ứng dụng Google Gemini AI."
                : "Designing and engineering distributed high-throughput backend services using Spring Boot, FastAPI, and Node.js alongside deep learning modeling with TensorFlow and Google Gemini."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Spring Boot", "FastAPI", "TensorFlow", "Gemini AI", "Microservices"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-2">
              projects.preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("projects.title")}
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>{language === "vi" ? "Xem tất cả dự án" : "View all projects"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.badge ? project.badge[language] : project.category}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {project.status === "completed"
                      ? language === "vi"
                        ? "Đã hoàn thành"
                        : "Completed"
                      : language === "vi"
                      ? "Đang phát triển"
                      : "In Progress"}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white leading-snug">
                  {project.title[language]}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {project.summary[language]}
                </p>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-dark-border text-xs">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-cyan-400 font-mono transition-colors"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono font-medium transition-colors"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tech Posts Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-2">
              knowledge.insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("blog.title")}
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>{language === "vi" ? "Xem tất cả bài viết" : "View all articles"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-cyan-400 font-semibold">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {post.title[language]}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {post.excerpt[language]}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-mono text-slate-500 border-t border-slate-200 dark:border-dark-border mt-4">
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>{t("blog.readMore")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === "vi"
                ? "Sẵn Sàng Hợp Tác Trong Các Dự Án Mới?"
                : "Ready to Collaborate on Future Engineering Projects?"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === "vi"
                ? "Dù bạn đang tìm kiếm kỹ sư chuyên về chẩn đoán ô tô, phát triển backend microservices, hay tích hợp giải pháp AI tạo sinh, tôi luôn sẵn lòng kết nối!"
                : "Whether you need specialized vehicle diagnostic telemetry, high-throughput microservices, or generative AI integration, I am always ready to collaborate!"}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>{t("nav.cta")}</span>
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-slate-900 border border-slate-700 text-white hover:border-cyan-400 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{t("nav.cv")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal Lightbox */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
