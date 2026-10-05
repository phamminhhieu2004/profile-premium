import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, ArrowLeft, ShieldAlert } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/common/SEO";

export const NotFoundPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <SEO
        title={lang === "vi" ? "404 - Không Tìm Thấy Trang" : "404 - Protocol Not Found"}
        description="The requested route does not exist on this telematics hub."
      />

      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative inline-block mb-8"
        >
          <div className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 select-none">
            404
          </div>
          <div className="absolute inset-0 blur-3xl bg-cyan-500/20 -z-10 pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{lang === "vi" ? "MÃ LỖI: ĐƯỜNG DẪN KHÔNG HỢP LỆ" : "STATUS: ROUTE_UNRESOLVED"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {lang === "vi" ? "Tọa Độ Này Không Tồn Tại" : "Navigation Signal Lost"}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            {lang === "vi"
              ? "Tài nguyên bạn đang cố truy cập đã bị di dời, đổi tên hoặc chưa từng được khởi tạo trên hệ thống."
              : "The resource coordinates you attempted to ping have been decommissioned or do not exist in this cluster."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 text-sm active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>{lang === "vi" ? "Về Trang Chủ" : "Return to Home"}</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium transition-all text-sm active:scale-95"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{lang === "vi" ? "Khám Phá Dự Án" : "Inspect Projects"}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
