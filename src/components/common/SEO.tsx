import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, ogImage }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const baseTitle = "Phạm Minh Hiếu | Automotive & Software Engineer Portfolio";
    document.title = title ? `${title} | Phạm Minh Hiếu` : baseTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description ||
          (language === "vi"
            ? "Portfolio cá nhân cao cấp của Phạm Minh Hiếu - Công nghệ Ô tô & Lập trình Phần mềm Backend, AI, Hệ thống nhúng."
            : "High-end personal portfolio of Pham Minh Hieu - Automotive Engineering & Backend, AI, Embedded Software Developer.")
      );
    }

    if (ogImage) {
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        ogImageTag.setAttribute("content", ogImage);
      }
    }
  }, [title, description, ogImage, language]);

  return null;
};
