import { CertificateItem } from "@/types";

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "google-gemini-certified",
    title: {
      vi: "Google Gemini Certified - University Student",
      en: "Google Gemini Certified - University Student",
    },
    issuer: "Google for Education",
    issueDate: "2024",
    credentialId: "G-GEMINI-STUDENT-2024",
    verificationUrl: "https://cloud.google.com/learn/certification",
    image: "/assets/certificates/gemini-certified-student.png",
    pdfUrl: "/assets/certificates/gemini-certified-student.pdf",
    highlight: true,
    category: "ai",
    skillsLearned: [
      "Gemini Multimodal AI",
      "Advanced Prompt Engineering",
      "Generative AI Workflows",
      "AI-Assisted Development",
      "Responsible AI & Safety",
    ],
    description: {
      vi: "Chứng chỉ chính thức từ Google công nhận năng lực thấu hiểu và ứng dụng hệ sinh thái mô hình trí tuệ nhân tạo đa phương thức Google Gemini, tối ưu hóa các quy trình nghiên cứu học thuật và phát triển phần mềm bằng Generative AI.",
      en: "Official credential from Google validating competencies in leveraging the Gemini multimodal AI foundation models and integrating generative AI into modern software engineering workflows.",
    },
  },
  {
    id: "gemini-certified-educator",
    title: {
      vi: "Google Gemini Certified - Educator",
      en: "Google Gemini Certified - Educator",
    },
    issuer: "Google for Education",
    issueDate: "2024",
    credentialId: "G-GEMINI-EDU-2024",
    verificationUrl: "https://cloud.google.com/learn/certification",
    image: "/assets/certificates/gemini-certified-educator.png",
    pdfUrl: "/assets/certificates/gemini-certified-educator.pdf",
    highlight: false,
    category: "ai",
    skillsLearned: [
      "Gemini in Education",
      "Generative AI Pedagogy",
      "Interactive Learning Design",
      "Technical Instruction with AI",
    ],
    description: {
      vi: "Chứng chỉ từ Google công nhận kỹ năng ứng dụng AI Google Gemini trong việc giảng dạy, xây dựng tài liệu học tập thông minh và thúc đẩy đổi mới phương pháp giáo dục công nghệ.",
      en: "Google certification recognizing expertise in integrating Google Gemini AI into technical instruction, instructional design, and intelligent educational ecosystems.",
    },
  },
  {
    id: "gemini-certified-faculty",
    title: {
      vi: "Google Gemini Certified - Faculty",
      en: "Google Gemini Certified - Faculty",
    },
    issuer: "Google for Education",
    issueDate: "2024",
    credentialId: "G-GEMINI-FAC-2024",
    verificationUrl: "https://cloud.google.com/learn/certification",
    image: "/assets/certificates/gemini-certified-faculty.png",
    pdfUrl: "/assets/certificates/gemini-certified-faculty.pdf",
    highlight: false,
    category: "ai",
    skillsLearned: [
      "Academic Research AI",
      "High-Level Gemini Reasoning",
      "Curriculum AI Integration",
      "Data & Computational AI",
    ],
    description: {
      vi: "Chứng chỉ chuyên sâu dành cho giảng viên và chuyên gia học thuật về tích hợp mô hình AI Google Gemini trong nghiên cứu khoa học, xử lý dữ liệu và phát triển chương trình giảng dạy liên ngành.",
      en: "Academic credential for faculty validating deep integration of Google Gemini AI in scientific research, advanced data processing, and multidisciplinary curriculum development.",
    },
  },
];

export const certificates = CERTIFICATES;
