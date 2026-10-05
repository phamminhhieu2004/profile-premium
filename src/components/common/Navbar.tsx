import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Send,
  FileText,
  Award,
  Layers,
  Home,
  User,
  Cpu,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: t("nav.home"), icon: Home },
    { to: "/about", label: t("nav.about"), icon: User },
    { to: "/skills", label: t("nav.skills"), icon: Cpu },
    { to: "/profile", label: t("nav.profile"), icon: FileText },
    { to: "/certificates", label: t("nav.certificates"), icon: Award },
    { to: "/projects", label: t("nav.projects"), icon: Layers },
    { to: "/blog", label: t("nav.blog"), icon: BookOpen },
    { to: "/contact", label: t("nav.contact"), icon: Send },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-dark-base/90 backdrop-blur-md border-b border-slate-200/80 dark:border-dark-border py-3 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark & Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 dark:bg-dark-surface p-1 flex items-center justify-center shadow-md shadow-cyan-950/30 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
            <img
              src="/assets/image.png"
              alt="Pham Minh Hieu Brand"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-wide leading-none group-hover:text-cyan-400 transition-colors">
              Minh <span className="text-cyan-400">Hiếu</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-cyan-400/80 tracking-widest uppercase leading-none mt-1">
              Auto × Software
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/40"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Language, Theme, Contact CTA */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-dark-border text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            title="Đổi ngôn ngữ / Change language"
            aria-label="Đổi ngôn ngữ"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase font-bold">{language}</span>
          </button>

          {/* Theme switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            title={theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
            aria-label="Chuyển chế độ giao diện"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500" />
            )}
          </button>

          {/* Contact CTA */}
          <Link
            to="/contact"
            className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-105"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("nav.cta")}</span>
          </Link>
        </div>

        {/* Mobile controls & hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg border border-slate-300 dark:border-dark-border text-xs font-mono text-slate-700 dark:text-slate-300"
            aria-label="Đổi ngôn ngữ"
          >
            <span className="uppercase font-bold">{language}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300"
            aria-label="Chuyển chế độ giao diện"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:text-cyan-400"
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-dark-base/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-2xl overflow-hidden px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <Link
                to="/profile"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                {t("nav.cv")}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
              >
                <Send className="w-3.5 h-3.5" />
                {t("nav.cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
