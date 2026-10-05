import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SKILLS } from "@/data/skills";
import { SEO } from "@/components/common/SEO";
import {
  Cpu,
  Car,
  Server,
  Zap,
  BatteryCharging,
  BrainCircuit,
  Sparkles,
  FileCode2,
  Layout,
  CircuitBoard,
  Boxes,
  Compass,
  Search,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SkillsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("skills.filter.all") },
    { id: "automotive", label: t("skills.filter.automotive") },
    { id: "backend", label: t("skills.filter.backend") },
    { id: "ai", label: t("skills.filter.ai") },
    { id: "frontend", label: t("skills.filter.frontend") },
    { id: "embedded", label: t("skills.filter.embedded") },
    { id: "tools", label: t("skills.filter.tools") },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Car":
        return <Car className="w-6 h-6 text-amber-500" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-amber-400" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-6 h-6 text-emerald-400" />;
      case "Server":
        return <Server className="w-6 h-6 text-cyan-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-blue-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-6 h-6 text-purple-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-cyan-300" />;
      case "FileCode2":
        return <FileCode2 className="w-6 h-6 text-emerald-400" />;
      case "Layout":
        return <Layout className="w-6 h-6 text-blue-400" />;
      case "CircuitBoard":
        return <CircuitBoard className="w-6 h-6 text-teal-400" />;
      case "Boxes":
        return <Boxes className="w-6 h-6 text-cyan-400" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-amber-500" />;
      default:
        return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      <SEO
        title={t("skills.title")}
        description={t("skills.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t("skills.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("skills.title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105"
                    : "bg-slate-200 dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-cyan-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={language === "vi" ? "Tìm kiếm kỹ năng..." : "Search skills..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-dark-card border border-slate-300 dark:border-dark-border rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`rounded-2xl p-6 bg-slate-100 dark:bg-dark-card border shadow-md flex flex-col justify-between hover:-translate-y-1 transition-all ${
                  skill.category === "automotive"
                    ? "border-amber-500/30 hover:border-amber-400"
                    : "border-slate-200 dark:border-dark-border hover:border-cyan-400"
                }`}
              >
                <div className="space-y-4">
                  {/* Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center p-2.5 shadow-inner">
                      {skill.logoUrl ? (
                        <img src={skill.logoUrl} alt={skill.name} className="w-full h-full object-contain" />
                      ) : (
                        getIcon(skill.iconName)
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        skill.category === "automotive"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      {skill.levelLabel[language]}
                    </span>
                  </div>

                  {/* Skill Name & Description */}
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                      {skill.description[language]}
                    </p>
                  </div>
                </div>

                {/* Proficiency Gauge Meter */}
                <div className="pt-6 space-y-2 border-t border-slate-200 dark:border-dark-border/60 mt-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{t("skills.level")}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        skill.category === "automotive"
                          ? "bg-gradient-to-r from-amber-500 to-amber-400"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            {language === "vi" ? "Không tìm thấy kỹ năng phù hợp với từ khóa." : "No skills match the query."}
          </div>
        )}
      </div>
    </div>
  );
};
