import { SkillItem } from "@/types";

export const SKILLS: SkillItem[] = [
  {
    id: "spring-boot",
    name: "Spring Boot",
    proficiency: 95,
    category: "backend",
    levelLabel: { vi: "Chuyên gia (95%)", en: "Expert (95%)" },
    description: {
      vi: "Kiến trúc Microservices, Spring Security, JPA/Hibernate, tối ưu truy vấn cơ sở dữ liệu và tích hợp Redis cache.",
      en: "Enterprise Microservices, Spring Security, JPA/Hibernate, SQL performance tuning, and Redis caching.",
    },
    iconName: "Server",
    logoUrl: "/assets/logos/spring_boot_logo.svg",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    proficiency: 90,
    category: "backend",
    levelLabel: { vi: "Nâng cao (90%)", en: "Advanced (90%)" },
    description: {
      vi: "Xây dựng High-performance Async REST APIs, tích hợp Pydantic, WebSockets và kết nối mô hình suy luận AI.",
      en: "High-throughput asynchronous REST APIs, Pydantic data schemas, WebSockets, and AI model inference serving.",
    },
    iconName: "Zap",
    logoUrl: "/assets/logos/fastapi_logo.svg",
  },
  {
    id: "vehicle-systems",
    name: "Vehicle Mechanics & Powertrain",
    proficiency: 88,
    category: "automotive",
    levelLabel: { vi: "Chuyên sâu (88%)", en: "Advanced (88%)" },
    description: {
      vi: "Nguyên lý hoạt động động cơ đốt trong, hệ thống truyền lực, hệ thống treo, phanh ABS và cân bằng điện tử ESP.",
      en: "Internal combustion principles, transmission systems, active suspension, ABS braking, and vehicle dynamics.",
    },
    iconName: "Car",
  },
  {
    id: "ecu-obd",
    name: "ECU & OBD-II Diagnostics",
    proficiency: 85,
    category: "automotive",
    levelLabel: { vi: "Chuyên sâu (85%)", en: "Proficient (85%)" },
    description: {
      vi: "Đọc và giải mã dữ liệu cảm biến thời gian thực, phân tích mã lỗi DTC, bản tin chuẩn CAN/LIN và hiệu chỉnh ECU.",
      en: "Real-time sensor telemetry, diagnostic trouble code (DTC) decoding, CAN/LIN bus analysis, and ECU parameter tuning.",
    },
    iconName: "Cpu",
  },
  {
    id: "ev-hybrid",
    name: "EV & Hybrid Technology",
    proficiency: 82,
    category: "automotive",
    levelLabel: { vi: "Chuyên sâu (82%)", en: "Proficient (82%)" },
    description: {
      vi: "Hệ thống pin điện áp cao, quản lý nhiệt độ pin (BMS), động cơ đồng bộ nam châm vĩnh cửu và bộ biến tần công suất.",
      en: "High-voltage battery architecture, Battery Management Systems (BMS), PMSM traction motors, and power inverters.",
    },
    iconName: "BatteryCharging",
  },
  {
    id: "tensorflow",
    name: "TensorFlow & Deep Learning",
    proficiency: 90,
    category: "ai",
    levelLabel: { vi: "Nâng cao (90%)", en: "Advanced (90%)" },
    description: {
      vi: "Huấn luyện mạng nơ-ron nhận diện dạng sóng âm thanh rung động động cơ, Computer Vision và phân loại dữ liệu cảm biến.",
      en: "Deep neural networks for acoustic engine vibration diagnostics, Computer Vision, and real-time sensor classification.",
    },
    iconName: "BrainCircuit",
    logoUrl: "/assets/logos/tensorflow_logo.svg",
  },
  {
    id: "gemini-ai",
    name: "Google Gemini AI & LLMs",
    proficiency: 92,
    category: "ai",
    levelLabel: { vi: "Chuyên gia (92%)", en: "Expert (92%)" },
    description: {
      vi: "Tích hợp Generative AI, Prompt Engineering đa phương thức, RAG dựa trên tài liệu kỹ thuật ô tô và AI Agents.",
      en: "Generative AI integration, multimodal prompt engineering, technical RAG over vehicle service manuals, and autonomous AI agents.",
    },
    iconName: "Sparkles",
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    proficiency: 85,
    category: "backend",
    levelLabel: { vi: "Thành thạo (85%)", en: "Proficient (85%)" },
    description: {
      vi: "Phát triển dịch vụ mạng tốc độ cao, xử lý luồng sự kiện I/O, middleware xác thực JWT và kết nối cơ sở dữ liệu MongoDB/PostgreSQL.",
      en: "Event-driven runtime services, stream processing, robust JWT security middleware, and PostgreSQL/MongoDB integration.",
    },
    iconName: "FileCode2",
    logoUrl: "/assets/logos/nodejs_logo.svg",
  },
  {
    id: "react-ts",
    name: "React.js & TypeScript",
    proficiency: 88,
    category: "frontend",
    levelLabel: { vi: "Thành thạo (88%)", en: "Proficient (88%)" },
    description: {
      vi: "Xây dựng Single Page Application hiện đại, giao diện trực quan hóa đồ họa, quản lý state và tối ưu hóa render.",
      en: "Modern Single Page Applications, dashboard data visualization, strict typing, and responsive component architecture.",
    },
    iconName: "Layout",
  },
  {
    id: "embedded-can",
    name: "CAN Bus & Embedded Systems",
    proficiency: 80,
    category: "embedded",
    levelLabel: { vi: "Thành thạo (80%)", en: "Proficient (80%)" },
    description: {
      vi: "Giao tiếp CAN bus qua MCP2515, vi điều khiển STM32/ESP32, đọc tín hiệu analog/digital và chuẩn hóa dữ liệu viễn thông.",
      en: "CAN bus transceivers (MCP2515), STM32/ESP32 firmware, analog/digital sensor conditioning, and telemetry standardization.",
    },
    iconName: "CircuitBoard",
  },
  {
    id: "docker-devops",
    name: "Docker & DevOps",
    proficiency: 84,
    category: "tools",
    levelLabel: { vi: "Thành thạo (84%)", en: "Proficient (84%)" },
    description: {
      vi: "Đóng gói container nhiều tầng, quản lý môi trường bằng Docker Compose, CI/CD tự động và tối ưu dung lượng image.",
      en: "Multi-stage container builds, Docker Compose service orchestration, automated CI/CD pipelines, and runtime optimization.",
    },
    iconName: "Boxes",
  },
  {
    id: "cad-sim",
    name: "CAD Modeling & Simulation",
    proficiency: 78,
    category: "automotive",
    levelLabel: { vi: "Khá (78%)", en: "Intermediate (78%)" },
    description: {
      vi: "Thiết kế mô hình cơ khí 3D, mô phỏng động học kết cấu và xuất bản vẽ kỹ thuật chi tiết theo tiêu chuẩn công nghiệp.",
      en: "3D parametric mechanical drafting, kinematics structural simulation, and standardized technical assembly blueprints.",
    },
    iconName: "Compass",
  },
];

export const skills = SKILLS;
