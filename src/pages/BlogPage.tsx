import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { posts } from "../data/posts";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/common/SEO";

export const BlogPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "all" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const title = post.title[lang].toLowerCase();
      const excerpt = post.excerpt[lang].toLowerCase();
      const tags = post.tags.join(" ").toLowerCase();
      return matchCat && (title.includes(q) || excerpt.includes(q) || tags.includes(q));
    });
  }, [searchQuery, selectedCategory, lang]);

  return (
    <div className="min-h-screen py-12 md:py-20">
      <SEO
        title={lang === "vi" ? "Bài Viết & Nghiên Cứu Kỹ Thuật" : "Technical Articles & Research"}
        description={
          lang === "vi"
            ? "Tổng hợp bài viết kỹ thuật, nghiên cứu chẩn đoán ô tô OBD-II/CAN Bus, kiến trúc vi dịch vụ Spring Boot và ứng dụng AI."
            : "Engineering insights, automotive OBD-II/CAN diagnostics, high-throughput Spring Boot architectures, and edge AI applications."
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === "vi" ? "NGHIÊN CỨU & KIẾN THỨC KỸ THUẬT" : "RESEARCH & ENGINEERING LOGS"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {lang === "vi" ? "Góc Chia Sẻ Chuyên Sâu" : "Technical Publications"}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {lang === "vi"
              ? "Tài liệu chuyên sâu giao thoa giữa kỹ thuật cơ điện tử ô tô hiện đại, phân tích dữ liệu telemetry và kiến trúc backend phân tán."
              : "In-depth technical treatises at the nexus of automotive embedded telemetry, real-time diagnostic systems, and scalable enterprise backends."}
          </p>
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "vi"
                    ? "Tìm bài viết, giao thức, từ khóa..."
                    : "Search topics, protocols, keywords..."
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {cat === "all" ? (lang === "vi" ? "Tất cả" : "All Topics") : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-slate-900/40 p-8">
            <Sparkles className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <p className="text-slate-700 dark:text-slate-300 font-medium text-base mb-1">
              {lang === "vi" ? "Không tìm thấy bài viết phù hợp" : "No matching publications found"}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "vi"
                ? "Hãy thử tìm kiếm với các từ khóa khác hoặc xóa bộ lọc."
                : "Try adjusting your query or resetting category filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block relative aspect-video overflow-hidden bg-slate-950"
                  >
                    <img
                      src={post.coverImage || "/assets/picture 2.jpg"}
                      alt={post.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/picture 2.jpg";
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-cyan-400 font-mono text-xs">
                      {post.category}
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title[lang]}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt[lang]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono"
                        >
                          <Tag className="w-2.5 h-2.5 text-cyan-500 dark:text-cyan-400" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400">
                      <span>{lang === "vi" ? "Đọc toàn bộ bài" : "Read Full Article"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
