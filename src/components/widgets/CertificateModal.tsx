import React, { useState, useEffect } from "react";
import { CertificateItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { X, ExternalLink, Award, CheckCircle, Calendar, ShieldCheck, FileText, Download, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"pdf" | "image">("pdf");

  useEffect(() => {
    if (certificate?.pdfUrl) {
      setActiveTab("pdf");
    } else {
      setActiveTab("image");
    }
  }, [certificate]);

  if (!certificate) return null;

  const hasPdf = Boolean(certificate.pdfUrl || certificate.image.endsWith(".pdf"));
  const pdfSrc = certificate.pdfUrl || (certificate.image.endsWith(".pdf") ? certificate.image : undefined);
  const imgSrc = certificate.image.endsWith(".pdf") ? certificate.image.replace(/\.pdf$/i, ".png") : certificate.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 dark:bg-dark-card border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 my-auto"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 dark:border-dark-border bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-wide">
                  {certificate.title[language]}
                </h3>
                <p className="text-xs text-cyan-400 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {certificate.credentialId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {/* View Mode Tabs if both PDF and Image badge exist */}
            {hasPdf && imgSrc && (
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("pdf")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeTab === "pdf"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                        : "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                    <span>{language === "vi" ? "Tài liệu PDF gốc" : "Official PDF"}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("image")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeTab === "image"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                        : "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === "vi" ? "Huy hiệu (Badge)" : "Badge"}</span>
                  </button>
                </div>

                {pdfSrc && (
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === "vi" ? "Mở / Tải PDF" : "Open PDF"}</span>
                  </a>
                )}
              </div>
            )}

            {/* Document / Media Display */}
            {hasPdf && activeTab === "pdf" && pdfSrc ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
                <iframe
                  src={`${pdfSrc}#toolbar=0&navpanes=0`}
                  title={certificate.title[language]}
                  className="w-full h-[460px] sm:h-[520px] rounded-t-xl bg-slate-950 border-0"
                />
                <div className="flex items-center justify-between p-3 bg-slate-950 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-md">{certificate.title[language]}.pdf</span>
                  </div>
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{language === "vi" ? "Toàn màn hình" : "Fullscreen"}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 p-4 flex items-center justify-center group">
                <img
                  src={imgSrc}
                  alt={certificate.title[language]}
                  className="w-auto h-auto max-h-[380px] object-contain transition-transform duration-300 group-hover:scale-[1.01] rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
                  {t("certificates.issuer")}
                </span>
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {certificate.issuer}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
                  {t("certificates.date")}
                </span>
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {certificate.issueDate}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider mb-2">
                {language === "vi" ? "Mô tả chứng nhận" : "Credential Overview"}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {certificate.description[language]}
              </p>
            </div>

            {certificate.skillsLearned.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider mb-2">
                  {t("certificates.skills")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skillsLearned.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 dark:border-dark-border bg-slate-950/50">
            {pdfSrc && (
              <a
                href={pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors font-mono"
              >
                <FileText className="w-4 h-4 text-rose-400" />
                <span>{language === "vi" ? "Mở file PDF gốc" : "Open Official PDF"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors font-mono"
              >
                <ExternalLink className="w-4 h-4" />
                {t("certificates.verify")}
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              {language === "vi" ? "Đóng" : "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
