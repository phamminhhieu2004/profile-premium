import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { BackToTop } from "./components/common/BackToTop";
import { WeatherWidget } from "./components/widgets/WeatherWidget";
import { AIChatbot } from "./components/widgets/AIChatbot";
import { ToastProvider } from "./components/common/Toast";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased relative overflow-x-hidden transition-colors duration-300">
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.07] dark:bg-cyan-500/[0.04] blur-[120px]" />
              <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/[0.06] dark:bg-blue-600/[0.04] blur-[120px]" />
              <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.05] dark:bg-emerald-500/[0.03] blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e130_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e130_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <Navbar />

            <main className="flex-1 pt-16 sm:pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/resume" element={<Navigate to="/profile" replace />} />
                <Route path="/cv" element={<Navigate to="/profile" replace />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
            <WeatherWidget />
            <AIChatbot />
            <BackToTop />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
};
