import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE } from "@/data/profile";
import { SEO } from "@/components/common/SEO";
import {
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Send,
  Calendar,
  Award,
  CheckCircle,
  FileText,
  Music,
  Car,
  Code2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      <SEO
        title={t("about.title")}
        description={PROFILE.introShort[language]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <User className="w-3.5 h-3.5" />
            <span>{t("about.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("about.title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Real Photos Showcase Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-100 dark:bg-dark-card shadow-lg group">
            <div className="aspect-[4/5] overflow-hidden bg-slate-900">
              <img
                src="/assets/picture 2.jpg"
                alt="Phạm Minh Hiếu Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-dark-border text-center">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Phạm Minh Hiếu
              </h3>
              <p className="text-xs text-cyan-500 font-mono">ICTU Automotive & Software</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-100 dark:bg-dark-card shadow-lg group">
            <div className="aspect-[4/5] overflow-hidden bg-slate-900">
              <img
                src="/assets/picture 1.jpg"
                alt="Working on automotive software"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-dark-border text-center">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {language === "vi" ? "Không Gian Nghiên Cứu" : "Engineering Workspace"}
              </h3>
              <p className="text-xs text-cyan-500 font-mono">Focus & Code Execution</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-100 dark:bg-dark-card shadow-lg group">
            <div className="aspect-[4/5] overflow-hidden bg-slate-900">
              <img
                src="/assets/picture 3.jpg"
                alt="Phạm Minh Hiếu"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-dark-border text-center">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {language === "vi" ? "Đời Sống & Đam Mê" : "Life & Passion"}
              </h3>
              <p className="text-xs text-cyan-500 font-mono">Producer, DJ & Tech Creator</p>
            </div>
          </div>
        </div>

        {/* Detailed Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-dark-border">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {t("about.info.personal")}
                </h2>
                <p className="text-xs text-slate-500 font-mono">Dossier / Key Metrics</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  {t("about.info.name")}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{PROFILE.name}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {t("about.info.birth")}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{PROFILE.birthYear}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  {t("about.info.location")}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{PROFILE.location}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  {t("about.info.phone")}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{PROFILE.phone}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  {t("about.info.email")}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono text-xs">{PROFILE.email}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  {t("about.info.telegram")}
                </span>
                <a
                  href={PROFILE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-500 hover:underline font-mono"
                >
                  {PROFILE.telegram}
                </a>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-dark-border/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {t("about.info.languages")}
                </span>
                <span className="font-medium text-slate-900 dark:text-white text-xs">{t("about.info.languages.val")}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {t("about.info.status")}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {t("about.info.status.val")}
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Philosophy Card */}
          <div className="space-y-6">
            {/* Philosophy */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-cyan-500/30 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {t("about.philosophy.title")}
                </h2>
              </div>
              <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic border-l-2 border-cyan-400 pl-4 py-1 leading-relaxed">
                &ldquo;{t("about.philosophy.desc")}&rdquo;
              </blockquote>
            </div>

            {/* Career Objectives */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {language === "vi" ? "Mục Tiêu Nghề Nghiệp" : "Career Trajectory"}
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "vi"
                  ? "Trở thành Kỹ sư Trưởng (Lead Engineer) trong mảng Phần mềm Ô tô (Automotive Software Architecture), kết nối liền mạch giữa các chuẩn giao tiếp vật lý trên xe (CAN, LIN, FlexRay, OBD-II) với hạ tầng đám mây và Trí tuệ Nhân tạo để mang lại các giải pháp an toàn, thông minh và tiết kiệm năng lượng cho phương tiện thế hệ mới."
                  : "Aspiring to become an Automotive Software Architect, bridging low-level vehicular protocols (CAN, LIN, FlexRay, OBD-II) with cloud-native distributed microservices and multimodal AI agents to power safe, connected, and energy-efficient mobility."}
              </p>
            </div>

            {/* Personal Hobbies & Creative Life */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Music className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {language === "vi" ? "Hoạt Động Sáng Tạo & Sở Thích" : "Creative Pursuits & Interests"}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Music className="w-4 h-4 text-cyan-400" />
                  <span>Music Producer & DJ</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>Automotive Tuning</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Open Source Research</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Generative AI Modeling</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Experience Timeline Cards */}
        <div className="rounded-2xl p-6 sm:p-10 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-lg space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-dark-border">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {language === "vi" ? "Học Vấn & Kinh Nghiệm" : "Education & Experience Roadmap"}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Timeline & Formal Milestones</p>
            </div>
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t("hero.cta.resume")}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education column */}
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-500" />
                <span>{t("profile.education")}</span>
              </h3>
              <div className="space-y-6 border-l-2 border-amber-500/30 pl-4 sm:pl-6">
                {PROFILE.education.map((edu, idx) => (
                  <div key={idx} className="relative group space-y-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {edu.period}
                    </span>
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                      {edu.school[language]}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      {edu.major[language]}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {edu.detail[language]}
                    </p>
                    {edu.highlight && (
                      <p className="text-[11px] font-mono text-emerald-500 font-medium">
                        ★ {edu.highlight}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience column */}
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <span>{t("profile.experience")}</span>
              </h3>
              <div className="space-y-6 border-l-2 border-cyan-500/30 pl-4 sm:pl-6">
                {PROFILE.experience.map((exp, idx) => (
                  <div key={idx} className="relative group space-y-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {exp.period}
                    </span>
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                      {exp.role[language]}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                      {exp.organization[language]}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {exp.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900 border border-cyan-500/40 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-heading font-bold text-xl text-white">
              {language === "vi" ? "Tải Bản Sơ Yếu Lý Lịch Chính Thức" : "Download Official Curriculum Vitae"}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Format: Standard UTF-8 Text File with BOM for universal compatibility (.txt)
            </p>
          </div>
          <a
            href="/Pham_Minh_Hieu_CV.txt"
            download="Pham_Minh_Hieu_CV.txt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md hover:scale-105 transition-all shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>{t("profile.download")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
