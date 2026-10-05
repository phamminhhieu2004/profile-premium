import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  ExternalLink,
  Code2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Languages,
  CheckCircle2,
} from "lucide-react";
import { profileData } from "../data/profile";
import { certificates } from "../data/certificates";
import { skills } from "../data/skills";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/common/SEO";
import { useToast } from "../components/common/Toast";

export const ProfilePage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"visual" | "raw">("visual");
  const [copied, setCopied] = useState(false);
  const [rawCvText, setRawCvText] = useState<string>("");
  const [loadingRaw, setLoadingRaw] = useState(false);

  const handleCopyRawCv = async () => {
    try {
      if (!rawCvText) {
        setLoadingRaw(true);
        const res = await fetch("/assets/Pham_Minh_Hieu_CV.txt");
        const text = await res.text();
        setRawCvText(text);
        await navigator.clipboard.writeText(text);
      } else {
        await navigator.clipboard.writeText(rawCvText);
      }
      setCopied(true);
      addToast(lang === "vi" ? "Đã sao chép nội dung CV vào clipboard!" : "CV content copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast(lang === "vi" ? "Không thể sao chép tự động" : "Failed to copy clipboard", "error");
    } finally {
      setLoadingRaw(false);
    }
  };

  const handleFetchRawCv = async () => {
    if (rawCvText) {
      setActiveTab("raw");
      return;
    }
    setLoadingRaw(true);
    try {
      const res = await fetch("/assets/Pham_Minh_Hieu_CV.txt");
      if (res.ok) {
        const text = await res.text();
        setRawCvText(text);
      } else {
        setRawCvText(generateFallbackCvText());
      }
    } catch {
      setRawCvText(generateFallbackCvText());
    } finally {
      setLoadingRaw(false);
      setActiveTab("raw");
    }
  };

  const generateFallbackCvText = (): string => {
    return `===============================================================
THÔNG TIN ỨNG VIÊN - PHẠM MINH HIẾU
===============================================================
Họ và tên: ${profileData.name}
Năm sinh: ${profileData.birthYear}
Email: ${profileData.email}
Điện thoại: ${profileData.phone}
Địa chỉ: ${profileData.location}
Website: ${profileData.website}
GitHub: ${profileData.github}

MỤC TIÊU NGHỀ NGHIỆP:
${profileData.bioFull.vi}

HỌC VẤN:
- ${profileData.education[0].period}: ${profileData.education[0].school.vi}
  Chuyên ngành: ${profileData.education[0].major.vi}
  Chi tiết: ${profileData.education[0].detail.vi}

KINH NGHIỆM & DỰ ÁN KỸ THUẬT:
${profileData.experience
  .map(
    (exp) =>
      `- ${exp.period}: ${exp.role.vi} tại ${exp.organization.vi}\n  Mô tả: ${exp.description.vi}\n  Công nghệ: ${exp.tags.join(
        ", "
      )}`
  )
  .join("\n\n")}

KỸ NĂNG NỔI BẬT:
- Automotive: CAN Bus, OBD-II, UDS Diagnostics, ECU Remapping, Engine Acoustic Analysis
- Backend & Cloud: Spring Boot, FastAPI, Node.js, Express, PostgreSQL, Redis, Docker
- AI & Data: TensorFlow, PyTorch, Google Gemini API, Computer Vision, Signal Processing
===============================================================`;
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <SEO
        title={lang === "vi" ? "Hồ Sơ Cá Nhân & CV" : "Curriculum Vitae & Profile"}
        description={
          lang === "vi"
            ? "Hồ sơ kỹ thuật chi tiết của Phạm Minh Hiếu - Kỹ sư Công nghệ Ô tô & Lập trình viên Backend AI."
            : "Detailed technical CV of Pham Minh Hieu - Automotive Engineering Specialist & Backend AI Developer."
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950/90 backdrop-blur-xl p-6 sm:p-10 mb-10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="relative group shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-500/30 p-1 bg-slate-800/80 shadow-xl group-hover:border-cyan-400 transition-colors">
                <img
                  src="/assets/picture 1.jpg"
                  alt={profileData.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/avatar.jpg";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>ICTU</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{lang === "vi" ? "HỒ SƠ NĂNG LỰC CHÍNH THỨC" : "OFFICIAL CURRICULUM VITAE"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {profileData.name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-cyan-400 mb-4">
                {profileData.mainSpecialty[lang]}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
                {profileData.bioFull[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300 mb-8">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {lang === "vi" ? "Sinh năm" : "Born"}: {profileData.birthYear}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="/assets/Pham_Minh_Hieu_CV.txt"
                  download="Pham_Minh_Hieu_CV.txt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("common.downloadCv")}</span>
                </a>

                <button
                  type="button"
                  onClick={handleFetchRawCv}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{lang === "vi" ? "Xem văn bản gốc" : "View Raw Text"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyRawCv}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">{lang === "vi" ? "Đã chép" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>{lang === "vi" ? "Sao chép CV" : "Copy CV"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "visual"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {lang === "vi" ? "Giao diện trực quan" : "Interactive CV View"}
            </button>
            <button
              type="button"
              onClick={handleFetchRawCv}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "raw"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {lang === "vi" ? "Nội dung Text (.txt)" : "Raw CV Stream (.txt)"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "visual" ? (
            <motion.div
              key="visual"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {lang === "vi" ? "Học Vấn & Đào Tạo" : "Education & Credentials"}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">
                          ACADEMIC FOUNDATION & SPECIALIZATION
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {profileData.education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="relative pl-6 sm:pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:to-transparent"
                        >
                          <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                              {edu.period}
                            </span>
                            {edu.highlight && (
                              <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
                                <Award className="w-3.5 h-3.5" />
                                {edu.highlight}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {edu.school[lang]}
                          </h3>
                          <p className="text-sm font-medium text-cyan-400 mb-2">
                            {edu.major[lang]}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {edu.detail[lang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {lang === "vi" ? "Kinh Nghiệm & Dự Án Thực Tế" : "Experience & Projects"}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">
                          PRACTICAL ENGINEERING APPLICATION
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {profileData.experience.map((exp, idx) => (
                        <div
                          key={idx}
                          className="relative pl-6 sm:pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent"
                        >
                          <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-slate-950" />
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                              {exp.period}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {exp.type.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {exp.role[lang]}
                          </h3>
                          <p className="text-sm font-medium text-blue-400 mb-2">
                            {exp.organization[lang]}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {exp.description[lang]}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                      <Code2 className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-bold text-white text-base">
                        {lang === "vi" ? "Ma Trận Kỹ Năng Kỹ Thuật" : "Technical Skill Matrix"}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      {skills.slice(0, 7).map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-slate-200 font-medium">{skill.name}</span>
                            <span className="text-cyan-400 font-mono">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                      <Award className="w-5 h-5 text-amber-400" />
                      <h3 className="font-bold text-white text-base">
                        {lang === "vi" ? "Chứng Chỉ Tiêu Biểu" : "Selected Certificates"}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-1">
                            <span>{cert.issuer}</span>
                            <span>{cert.issueDate}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white mb-1">
                            {cert.title[lang]}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono">
                            ID: {cert.credentialId}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                      <Languages className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-bold text-white text-base">
                        {lang === "vi" ? "Ngôn Ngữ & Giao Tiếp" : "Languages & Soft Skills"}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">
                            {lang === "vi" ? "Tiếng Việt:" : "Vietnamese:"}
                          </strong>{" "}
                          {lang === "vi" ? "Tiếng mẹ đẻ (Bản ngữ)" : "Native speaker"}
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">
                            {lang === "vi" ? "Tiếng Anh:" : "English:"}
                          </strong>{" "}
                          {lang === "vi"
                            ? "Đọc hiểu tài liệu kỹ thuật, Datasheet ô tô, API documentation"
                            : "Technical documentation, Automotive datasheets, REST/gRPC API specs"}
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">
                            {lang === "vi" ? "Tư duy giải quyết vấn đề:" : "Problem Solving:"}
                          </strong>{" "}
                          {lang === "vi"
                            ? "Phương pháp tiếp cận theo hệ thống, cô lập lỗi phần cứng và phần mềm"
                            : "Systematic troubleshooting across hardware & software boundaries"}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="raw"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-2xl border border-white/10 bg-slate-950 p-6 sm:p-8 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs text-slate-400">Pham_Minh_Hieu_CV.txt</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyRawCv}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Copy Text"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href="/assets/Pham_Minh_Hieu_CV.txt"
                    download
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {loadingRaw ? (
                <div className="py-20 text-center text-slate-400">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <span>Loading raw CV stream...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 selection:bg-cyan-500 selection:text-slate-950">
                  {rawCvText || generateFallbackCvText()}
                </pre>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
