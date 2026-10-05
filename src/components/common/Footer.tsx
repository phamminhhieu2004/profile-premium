import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socials";
import { Github, Facebook, Send, Share2, Instagram, ArrowUpRight, Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Github":
        return <Github className="w-4 h-4" />;
      case "Facebook":
        return <Facebook className="w-4 h-4" />;
      case "Share2":
        return <Share2 className="w-4 h-4" />;
      case "Instagram":
        return <Instagram className="w-4 h-4" />;
      case "Send":
        return <Send className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-dark-border bg-slate-100/70 dark:bg-dark-base/90 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-dark-border/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-300/80 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-1 flex items-center justify-center shadow-md">
                <img src="/assets/image.png" alt="Pham Minh Hieu" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Phạm Minh <span className="text-cyan-400">Hiếu</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {PROFILE.introShort[language]}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t("about.info.status.val")}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-200">
              {language === "vi" ? "Khám Phá" : "Exploration"}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-400 transition-colors">
                  {t("nav.skills")}
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-cyan-400 transition-colors">
                  {t("nav.certificates")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-400 transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social Channels */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-200">
              {language === "vi" ? "Mạng Xã Hội" : "Social Links"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-200 dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-105 shadow-sm transition-all"
                  aria-label={item.ariaLabel}
                  title={item.platform}
                >
                  {getSocialIcon(item.icon)}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-mono pt-1">
              Thái Nguyên, Việt Nam
            </p>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            &copy; {currentYear} {PROFILE.name}. {t("footer.rights")}
          </div>
          <div className="flex items-center gap-2">
            <span>Automotive Technology × Modern Software</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
