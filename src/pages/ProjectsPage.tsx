import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/data/projects";
import { SEO } from "@/components/common/SEO";
import {
  Layers,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t("projects.filter.all") },
    { id: "software", label: t("projects.filter.software") },
    { id: "automotive", label: t("projects.filter.automotive") },
    { id: "ai", label: t("projects.filter.ai") },
    { id: "telemetry", label: t("projects.filter.telemetry") },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      <SEO
        title={t("projects.title")}
        description={t("projects.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("projects.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("projects.title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105"
                  : "bg-slate-200 dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-cyan-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Detailed List */}
        <div className="space-y-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xl hover:border-cyan-500/40 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-6">
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
                          {project.badge[language]}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {project.status === "completed"
                          ? language === "vi"
                            ? "Đã hoàn thành"
                            : "Completed"
                          : language === "vi"
                          ? "Đang phát triển"
                          : "In Progress"}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {project.title[language]}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.summary[language]}
                    </p>

                    {/* Problem & Solution block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-slate-200/60 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold block">
                          {t("projects.problem")}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.problem[language]}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-200/60 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                          {t("projects.solution")}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.solution[language]}
                        </p>
                      </div>
                    </div>

                    {/* Goals */}
                    {project.goals[language].length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold block">
                          {language === "vi" ? "Mục tiêu & Kết quả" : "Engineering Objectives"}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {project.goals[language].map((goal, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right side: Tech tags & Action links */}
                  <div className="lg:col-span-4 rounded-2xl p-6 bg-slate-200/50 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800/80 space-y-6">
                    <div>
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-3">
                        {t("projects.technologies")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-dark-card border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-cyan-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-300 dark:border-slate-800 space-y-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 transition-all shadow-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>{t("projects.viewCode")}</span>
                        </a>
                      )}

                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{t("projects.viewLive")}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
