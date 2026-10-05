import { ProjectItem } from "@/types";

export const PROJECTS: ProjectItem[] = [
  {
    id: "profile-premium",
    slug: "profile-premium",
    title: {
      vi: "Profile Premium - Personal Portfolio & Tech Showroom",
      en: "Profile Premium - Personal Portfolio & Tech Showroom",
    },
    summary: {
      vi: "Website portfolio cá nhân cao cấp tích hợp AI chatbot thông minh, widget thời tiết toàn cầu, song ngữ Việt - Anh và thiết kế chuẩn công nghệ kỹ thuật ô tô hiện đại.",
      en: "High-end personal portfolio featuring intelligent AI assistant, real-time global weather telemetry, bilingual i18n, and an automotive tech design system.",
    },
    category: "software",
    status: "completed",
    featured: true,
    badge: { vi: "Showcase Chính", en: "Flagship Showcase" },
    tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Gemini AI"],
    problem: {
      vi: "Hầu hết website portfolio hiện nay có bố cục chung chung, chưa thể hiện được sự giao thoa độc đáo giữa ngành Kỹ thuật Ô tô cơ điện tử và năng lực Lập trình Phần mềm hiện đại.",
      en: "Most portfolio websites use generic templates that fail to convey the intersection between mechatronic Automotive Engineering and modern Software Development.",
    },
    solution: {
      vi: "Xây dựng không gian trưng bày kỹ thuật trực quan với ngôn ngữ thiết kế công nghệ cyber-automotive, kết nối trợ lý AI và widget khí tượng thời gian thực.",
      en: "Built an intuitive technical showroom combining cyber-automotive aesthetics, integrated AI assistance, and real-time environmental telemetry.",
    },
    goals: {
      vi: [
        "Thiết kế giao diện Dark/Light mode cao cấp lấy cảm hứng từ bảng điều khiển xe thể thao hiện đại.",
        "Tích hợp Chatbot AI trả lời câu hỏi trực tiếp về hồ sơ năng lực và kỹ thuật.",
        "Đảm bảo tải trang dưới 2 giây và chuẩn Responsive 100% trên mọi thiết bị.",
      ],
      en: [
        "Design a sleek Dark/Light mode interface inspired by modern vehicle digital cockpits.",
        "Embed an AI Assistant directly grounded in verified portfolio and technical competencies.",
        "Achieve sub-2-second load times and 100% responsive fluidness across all form factors.",
      ],
    },
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Open-Meteo API", "Google Gemini API"],
    links: {
      github: "https://github.com/phamminhhieu2004/profile-premium",
      live: "https://phamminhhieu.site",
    },
  },
  {
    id: "obd2-telemetry-hub",
    slug: "obd2-telemetry-hub",
    title: {
      vi: "Hệ Thống Thu Thập & Đo Từ Xa OBD-II Ô Tô Thời Gian Thực",
      en: "Real-Time OBD-II Automotive Telemetry & Diagnostics Hub",
    },
    summary: {
      vi: "Nền tảng IoT kết nối với cổng chẩn đoán trên xe qua giao thức OBD-II/CAN bus, stream dữ liệu vòng tua RPM, tốc độ, nhiệt độ nước làm mát và mã lỗi DTC theo thời gian thực.",
      en: "IoT automotive telemetry platform connecting directly to in-vehicle CAN bus via OBD-II, streaming engine RPM, vehicle speed, coolant thermal metrics, and diagnostic fault codes in real time.",
    },
    category: "telemetry",
    status: "completed",
    featured: true,
    badge: { vi: "Dự Án Ô Tô & IoT", en: "Automotive & IoT" },
    tags: ["FastAPI", "Python", "WebSockets", "CAN Bus", "OBD-II", "Chart.js"],
    problem: {
      vi: "Các thiết bị quét lỗi OBD-II truyền thống thường cồng kềnh, không hỗ trợ lưu trữ dữ liệu dạng chuỗi thời gian trên đám mây để phân tích phòng ngừa sự cố từ xa.",
      en: "Traditional OBD-II diagnostic scan tools are bulky, isolated devices lacking cloud telemetry persistence and remote predictive diagnostics.",
    },
    solution: {
      vi: "Phát triển phần mềm gateway sử dụng Python FastAPI kết nối adapter ELM327, phân tích bản tin PID chuẩn SAE J1979 và đẩy dữ liệu qua WebSocket tới dashboard giao diện người dùng.",
      en: "Developed an async Python FastAPI gateway communicating with ELM327 transceivers, parsing standard SAE J1979 PIDs, and piping live streams to client dashboards via WebSockets.",
    },
    goals: {
      vi: [
        "Độ trễ truyền nhận telemetry dưới 100ms trong điều kiện kết nối mạng di động 4G.",
        "Tự động tra cứu và hiển thị giải thích nguyên nhân mã lỗi DTC kèm hướng dẫn khắc phục.",
      ],
      en: [
        "Achieve sub-100ms telemetry latency over standard cellular connections.",
        "Automatically correlate DTC trouble codes with troubleshooting guides and component diagrams.",
      ],
    },
    technologies: ["Python", "FastAPI", "AsyncIO", "WebSockets", "CAN Network", "ELM327", "Docker"],
    links: {
      github: "https://github.com/phamminhhieu2004/obd2-telemetry-hub",
    },
  },
  {
    id: "automotive-ai-diagnostics",
    slug: "automotive-ai-diagnostics",
    title: {
      vi: "Chẩn Đoán Lỗi Động Cơ Qua Âm Thanh & Rung Động Với AI",
      en: "AI Engine Acoustic & Vibration Fault Diagnostic System",
    },
    summary: {
      vi: "Ứng dụng mô hình học sâu (Deep Learning) trên TensorFlow để phân tích phổ âm thanh động cơ ô tô, nhận diện sớm các hư hỏng ở xéc-măng, bạc lót trục khuỷu và kim phun xăng.",
      en: "Deep Learning acoustic anomaly detection using TensorFlow, analyzing engine frequency spectrograms to detect piston ring wear, bearing clearances, and fuel injector misfires.",
    },
    category: "ai",
    status: "in_progress",
    featured: true,
    badge: { vi: "Nghiên Cứu AI", en: "AI Research" },
    tags: ["TensorFlow", "Python", "Signal Processing", "Spectrograms", "CNN", "FastAPI"],
    problem: {
      vi: "Việc chẩn đoán hư hỏng cơ khí bên trong động cơ đốt trong thường đòi hỏi phải tháo rã máy tốn kém hoặc phụ thuộc hoàn toàn vào kinh nghiệm thính giác của thợ lành nghề.",
      en: "Internal mechanical engine failure diagnosis conventionally demands expensive engine teardowns or subjective auditory inspection by senior technicians.",
    },
    solution: {
      vi: "Chuyển đổi tín hiệu âm thanh thu từ cảm biến áp điện thành biểu đồ phổ nhiệt (Mel-Spectrogram), sau đó đưa qua mạng tích chập CNN để phân loại trạng thái hoạt động với độ chính xác trên 92%.",
      en: "Transformed acoustic pressure waves into Mel-Spectrogram features, feeding them into a 2D Convolutional Neural Network that classifies anomalies with over 92% accuracy.",
    },
    goals: {
      vi: [
        "Phát hiện dấu hiệu mài mòn cơ khí trước khi động cơ xảy ra hiện tượng bó kẹt nghiêm trọng.",
        "Tối ưu kích thước mô hình để có thể chạy suy luận (Inference) ngay trên thiết bị nhúng tại gara.",
      ],
      en: [
        "Identify internal mechanical wear before critical engine seizure occurs.",
        "Quantize neural weights for real-time edge inference on modest garage workshop hardware.",
      ],
    },
    technologies: ["TensorFlow", "Librosa", "NumPy", "Python", "Mel-Spectrogram", "CNN"],
    links: {
      github: "https://github.com/phamminhhieu2004/automotive-ai-diagnostics",
    },
  },
  {
    id: "spring-boot-core-api",
    slug: "spring-boot-core-api",
    title: {
      vi: "Hệ Thống Backend Microservices & Quản Trị Đội Xe",
      en: "Enterprise Fleet Telematics & Microservices Backend",
    },
    summary: {
      vi: "Kiến trúc backend phân tán xây dựng trên nền tảng Spring Boot 3 và Java 17, quản lý dữ liệu hành trình, lịch trình bảo dưỡng định kỳ và tiêu hao nhiên liệu của đội xe vận tải.",
      en: "Distributed fleet management backend engineered with Spring Boot 3 and Java 17, handling multi-vehicle GPS tracking, preventive maintenance schedules, and fuel economy analytics.",
    },
    category: "software",
    status: "completed",
    featured: false,
    badge: { vi: "Doanh Nghiệp", en: "Enterprise" },
    tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "Redis", "Docker", "JWT", "Swagger"],
    problem: {
      vi: "Hệ thống quản lý đội xe truyền thống dạng Monolithic gặp nghẽn cổ chai khi số lượng xe gửi tín hiệu định vị và trạng thái đồng thời tăng cao.",
      en: "Monolithic fleet tracking architectures suffered severe performance degradation under high concurrent vehicular telemetry ingestion.",
    },
    solution: {
      vi: "Tách nhỏ thành các Microservice độc lập: Auth Service, Vehicle Service, Telematics Ingestion Service và Maintenance Alert Service, sử dụng Redis làm bộ nhớ đệm tốc độ cao.",
      en: "Decomposed the system into modular microservices with Redis caching, optimistic locking for vehicle assignment, and automated JWT token rotation.",
    },
    goals: {
      vi: [
        "Xử lý hơn 2,000 requests/giây với thời gian phản hồi trung bình dưới 45ms.",
        "Bảo mật nhiều lớp với Spring Security và cơ chế phân quyền RBAC chặt chẽ.",
      ],
      en: [
        "Process 2,000+ requests/sec with p95 response times under 45ms.",
        "Multi-layer defense with Spring Security and fine-grained Role-Based Access Control.",
      ],
    },
    technologies: ["Java 17", "Spring Boot 3", "Spring Data JPA", "PostgreSQL", "Redis", "Docker", "Flyway"],
    links: {
      github: "https://github.com/phamminhhieu2004/spring-boot-core-api",
    },
  },
];

export const projects = PROJECTS;
