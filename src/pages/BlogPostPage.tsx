import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  Check,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { posts } from "../data/posts";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/common/SEO";
import { useToast } from "../components/common/Toast";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const post = useMemo(() => {
    return posts.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 2);
  }, [post]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      addToast(
        lang === "vi"
          ? "Đã sao chép liên kết bài viết vào clipboard!"
          : "Article link copied to clipboard!",
        "success"
      );
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast(lang === "vi" ? "Không thể sao chép liên kết" : "Failed to copy link", "error");
    }
  };

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <SEO
          title={lang === "vi" ? "Bài viết không tồn tại" : "Post Not Found"}
          description="The requested post could not be found."
        />
        <BookOpen className="w-16 h-16 text-slate-600 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {lang === "vi" ? "Không tìm thấy bài viết" : "Article Not Found"}
        </h1>
        <p className="text-slate-400 text-sm max-w-md mb-6">
          {lang === "vi"
            ? "Bài viết bạn đang tìm kiếm có thể đã được đổi tên hoặc chuyển vị trí lưu trữ."
            : "The publication you are requesting might have been relocated or updated."}
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:brightness-110 transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "vi" ? "Quay lại danh sách bài" : "Back to Blog"}</span>
        </Link>
      </div>
    );
  }

  const renderContent = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-200 dark:border-white/10"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-10 mb-4">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }

      if (trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="ml-6 list-disc text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-2">
            {trimmed.replace("- ", "")}
          </li>
        );
      }

      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="my-6 pl-4 py-2 border-l-4 border-cyan-500 bg-cyan-500/10 text-slate-700 dark:text-slate-300 italic text-sm sm:text-base rounded-r-lg"
          >
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }

      if (trimmed.startsWith("```")) {
        return null;
      }

      if (trimmed === "") {
        return <div key={idx} className="h-4" />;
      }

      return (
        <p key={idx} className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen py-10 md:py-16">
      <SEO
        title={post.title[lang]}
        description={post.excerpt[lang]}
        ogImage={post.coverImage}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "vi" ? "Quay lại" : "Back"}</span>
          </button>
        </div>

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {post.date}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            {post.title[lang]}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/30 bg-slate-800">
                <img
                  src="/assets/avatar.jpg"
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  {post.author}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ICTU Automotive & AI Engineering</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{lang === "vi" ? "Đã chép link" : "Link copied"}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  <span>{lang === "vi" ? "Chia sẻ" : "Share"}</span>
                </>
              )}
            </button>
          </div>
        </motion.header>

        {post.coverImage && (
          <div className="relative rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-white/10 aspect-video bg-slate-950 shadow-md">
            <img
              src={post.coverImage}
              alt={post.title[lang]}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 mb-12 shadow-xl"
        >
          <div className="prose dark:prose-invert max-w-none">
            {renderContent(post.content[lang])}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono"
              >
                <Tag className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              {lang === "vi" ? "Bài Viết Liên Quan Cùng Chủ Đề" : "Related Technical Publications"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 transition-all hover:border-cyan-500/40 hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <span className="text-xs text-cyan-500 dark:text-cyan-400 font-mono block mb-2">{rel.category}</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {rel.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                    {rel.excerpt[lang]}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-500 dark:text-cyan-400">
                    <span>{lang === "vi" ? "Đọc bài" : "Read now"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
