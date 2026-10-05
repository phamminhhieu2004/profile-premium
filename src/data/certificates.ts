import { CertificateItem } from "@/types";

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "google-gemini-certified",
    title: {
      vi: "Google Gemini Certified Professional",
      en: "Google Gemini Certified Professional",
    },
    issuer: "Google AI & DeepMind Education",
    issueDate: "15 Tháng 10, 2024",
    credentialId: "G-GEMINI-AI-2024-PMH",
    verificationUrl: "https://cloud.google.com/learn/certification",
    image: "/assets/certificates/google-gemini-certified.jpg",
    highlight: true,
    category: "ai",
    skillsLearned: [
      "Gemini Multimodal Models",
      "Advanced Prompt Engineering",
      "Generative AI Architectures",
      "Automotive Intelligent Agents",
      "Safety & Model Evaluation",
    ],
    description: {
      vi: "Chứng chỉ chuyên nghiệp cao cấp từ Google công nhận năng lực làm chủ hệ sinh thái mô hình đa phương thức Gemini, phát triển giải pháp Trí tuệ Nhân tạo tạo sinh (Generative AI) và ứng dụng trợ lý thông minh trong kỹ thuật kỹ thuật số.",
      en: "Advanced professional certification validating mastery in Google's Gemini multimodal foundation models, production generative AI pipelines, and domain-specific intelligent agents.",
    },
  },
  {
    id: "automotive-ecu-diagnostics",
    title: {
      vi: "Chuyên viên Điện tử Ô tô & Chẩn đoán ECU",
      en: "Automotive Electronics & ECU Diagnostics Specialist",
    },
    issuer: "International Council of Automotive Engineers (ICAE)",
    issueDate: "18 Tháng 10, 2023",
    credentialId: "ICAE-AEDS-2023-4591",
    verificationUrl: "https://icae-accreditation.org/verify/4591",
    image: "/assets/certificates/automotive-ecu-diagnostics.jpg",
    highlight: false,
    category: "automotive",
    skillsLearned: [
      "ECU Parameter Tuning",
      "CAN/LIN/FlexRay Protocol Analysis",
      "OBD-II Live Telemetry",
      "Sensor Signal Conditioning",
      "Automotive Failure Diagnostics",
    ],
    description: {
      vi: "Chứng chỉ chuẩn hóa năng lực chẩn đoán hệ thống điều khiển điện tử ô tô hiện đại, phân tích xung tín hiệu cảm biến động cơ và đọc mã lỗi chuyên sâu qua cổng giao tiếp OBD-II.",
      en: "Specialist accreditation confirming proficiency in electronic control unit (ECU) parameter analysis, vehicle communication bus protocols, and fault diagnosis systems.",
    },
  },
  {
    id: "deep-learning-tensorflow",
    title: {
      vi: "Chuyên gia Deep Learning & TensorFlow",
      en: "Deep Learning & TensorFlow Specialist",
    },
    issuer: "Deep Learning Institute & Stanford Online",
    issueDate: "26 Tháng 10, 2023",
    credentialId: "DLTF-PMH-987654321",
    verificationUrl: "https://deeplearning.ai/certificates/verify",
    image: "/assets/certificates/deep-learning-tensorflow.jpg",
    highlight: false,
    category: "ai",
    skillsLearned: [
      "Convolutional Neural Networks (CNN)",
      "Recurrent Neural Networks (LSTM/GRU)",
      "Acoustic & Vibration Signal Processing",
      "Model Quantization & Edge Deployment",
    ],
    description: {
      vi: "Chứng chỉ chuyên sâu về xây dựng, huấn luyện và triển khai các mô hình mạng nơ-ron học sâu (Deep Neural Networks) với thư viện TensorFlow trong bài toán phân loại và thị giác máy tính.",
      en: "Specialization credential verifying deep capability in designing, optimizing, and deploying deep neural architectures for computer vision, audio classification, and edge inference.",
    },
  },
  {
    id: "spring-boot-specialist",
    title: {
      vi: "Kiến trúc Backend Doanh nghiệp với Spring Boot",
      en: "Enterprise Backend Architecture with Spring Boot",
    },
    issuer: "Global Technology Alliance & Spring Community",
    issueDate: "15 Tháng 5, 2024",
    credentialId: "SB-EBA-98317-PMH",
    verificationUrl: "https://spring.io/certifications/verify",
    image: "/assets/certificates/spring-boot-specialist.jpg",
    highlight: false,
    category: "software",
    skillsLearned: [
      "Spring Boot 3.x",
      "Microservices Architecture",
      "Spring Security & OAuth2",
      "Distributed Caching with Redis",
      "Dockerized Deployment",
    ],
    description: {
      vi: "Chứng chỉ công nhận kỹ năng thiết kế, lập trình và vận hành hệ thống phần mềm phân tán (Microservices) chịu tải cao với Spring Boot, bảo mật OAuth2 và cơ sở dữ liệu quan hệ.",
      en: "Certified proficiency in engineering high-availability distributed microservices, scalable database transaction management, and resilient cloud-native application deployment.",
    },
  },
];

export const certificates = CERTIFICATES;
