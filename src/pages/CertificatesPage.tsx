import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CERTIFICATES } from "@/data/certificates";
import { SEO } from "@/components/common/SEO";
import { CertificateModal } from "@/components/widgets/CertificateModal";
import { CertificateItem } from "@/types";
import {
  Award,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Eye,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CertificatesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const geminiCert = CERTIFICATES.find((c) => c.id === "google-gemini-certified") || CERTIFICATES[0];
  const galleryCerts = CERTIFICATES.filter((c) => {
    if (selectedFilter === "all") return true;
    return c.category === selectedFilter;
  });

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      <SEO
        title={t("certificates.title")}
        description={t("certificates.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>{t("certificates.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("certificates.title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("certificates.subtitle")}
          </p>
        </div>

        {/* Prominent Google Gemini Spotlight Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-950/60 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="lg:col-span-7 space-y-5 text-white">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{t("certificates.spotlight.badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {geminiCert.title[language]}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {geminiCert.description[language]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-950/50 p-4 rounded-xl border border-cyan-900/40">
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] tracking-wider block">
                    {t("certificates.issuer")}
                  </span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    {geminiCert.issuer}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] tracking-wider block">
                    {t("certificates.credential")}
                  </span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {geminiCert.credentialId}
                  </span>
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t("certificates.skills")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {geminiCert.skillsLearned.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedCert(geminiCert)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t("certificates.view")}</span>
                </button>
                {geminiCert.verificationUrl && (
                  <a
                    href={geminiCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
                  >
                    <span>{t("certificates.verify")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setSelectedCert(geminiCert)}
                className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-slate-950 p-2 shadow-2xl cursor-pointer group hover:scale-[1.02] hover:border-cyan-400 transition-all"
              >
                <img
                  src={geminiCert.image}
                  alt={geminiCert.title[language]}
                  className="w-full h-auto rounded-xl object-contain"
                />
                <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/90 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 border border-cyan-500/50 shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>{t("certificates.view")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Filter & Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-500" />
              <span>{language === "vi" ? "Bộ Sưu Tập Chứng Chỉ Chuyên Môn" : "Credentials Gallery"}</span>
            </h2>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              {["all", "ai", "automotive", "software"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                    selectedFilter === filter
                      ? "bg-cyan-500 text-slate-950 shadow-sm"
                      : "bg-slate-200 dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {filter === "all"
                    ? t("skills.filter.all")
                    : filter === "ai"
                    ? "AI"
                    : filter === "automotive"
                    ? "Automotive"
                    : "Software"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryCerts.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md flex flex-col justify-between hover:border-cyan-500/40 hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-cyan-500/40">
                        <Eye className="w-3.5 h-3.5" />
                        {t("certificates.view")}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-500 font-semibold">{cert.issuer}</span>
                      <span className="text-slate-500">{cert.issueDate}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {cert.title[language]}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {cert.description[language]}
                    </p>

                    <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{cert.credentialId}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-dark-border/60 mt-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-500 hover:text-cyan-400"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t("certificates.view")}</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                    >
                      <span>{t("certificates.verify")}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
