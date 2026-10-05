import { ProfileData } from "@/types";

export const PROFILE: ProfileData = {
  name: "Phạm Minh Hiếu",
  birthYear: 2004,
  location: "Thái Nguyên, Việt Nam",
  phone: "0989 770 905",
  email: "dtc225100025@ictu.edu.vn",
  telegram: "@pmh_2004",
  telegramUrl: "https://t.me/pmh_2004",
  github: "https://github.com/phamminhhieu2004",
  facebook: "https://www.facebook.com/goodboy.real.minhhieu",
  tiktok: "https://www.tiktok.com/@goodboy.real_2004",
  instagram: "https://www.instagram.com/phamminhhieu2004",
  website: "https://phamminhhieu.site",
  cvUrlTxt: "/Pham_Minh_Hieu_CV.txt",
  mainSpecialty: {
    vi: "Công nghệ Kỹ thuật Ô tô × Lập trình Phần mềm",
    en: "Automotive Technology × Software Engineering",
  },
  tagline: {
    vi: "Kỹ sư Công nghệ Ô tô & Lập trình viên Backend AI",
    en: "Automotive Engineer & Backend AI Developer",
  },
  introShort: {
    vi: "Kết hợp giữa thế giới Công nghệ Ô tô và Lập trình Phần mềm. Tôi xây dựng các hệ thống backend vững chắc với Spring Boot, FastAPI & Node.js trên nền tảng kiến thức kỹ thuật ô tô, chẩn đoán điện tử và công nghệ xe điện/hybrid.",
    en: "Bridging the worlds of Automotive Engineering and Modern Software Development. Building scalable backend architectures with Spring Boot, FastAPI, and Node.js on a strong foundation of vehicle electronics, OBD diagnostics, and EV/hybrid technology.",
  },
  bioFull: {
    vi: "Tôi là Phạm Minh Hiếu, sinh năm 2004 tại Thái Nguyên, hiện đang theo học chuyên ngành Công nghệ Kỹ thuật Ô tô tại Trường Đại học Công nghệ Thông tin và Truyền thông (ICTU). Với đam mê cháy bỏng trong cả hai lĩnh vực phần cứng cơ điện tử và phần mềm hiện đại, tôi định hướng phát triển bản thân thành một kỹ sư liên ngành có khả năng thiết kế hệ thống nhúng, viễn thông ô tô (telematics), chẩn đoán thông minh ứng dụng AI và xây dựng hệ sinh thái backend hiệu năng cao.",
    en: "I am Pham Minh Hieu, born in 2004 in Thai Nguyen, currently pursuing Automotive Engineering Technology at the University of Information and Communication Technology (ICTU). Driven by passion for both electromechanical vehicle hardware and modern software architectures, I specialize in bridging telematics, intelligent AI-driven diagnostics, and high-performance backend microservices.",
  },
  education: [
    {
      period: "2022 - Hiện tại",
      school: {
        vi: "Trường Đại học Công nghệ Thông tin và Truyền thông (ICTU)",
        en: "University of Information and Communication Technology (ICTU)",
      },
      major: {
        vi: "Công nghệ Kỹ thuật Ô tô",
        en: "Automotive Engineering Technology",
      },
      detail: {
        vi: "Học chuyên sâu về cơ điện tử ô tô, hệ thống điều khiển động cơ, giao thức chẩn đoán OBD-II, lập trình và tinh chỉnh ECU, công nghệ xe điện hóa (EV) và xe Hybrid, song song với phát triển phần mềm kiến trúc Microservices và Trí tuệ nhân tạo.",
        en: "In-depth study of vehicle mechatronics, engine control systems, OBD-II communication protocols, ECU flashing/calibration, electric and hybrid vehicle powertrain systems, coupled with distributed backend development and AI.",
      },
      highlight: "GPA Xuất sắc & Nghiên cứu khoa học về Telematics",
    },
    {
      period: "2019 - 2022",
      school: {
        vi: "Trường THPT Phổ Yên",
        en: "Pho Yen High School",
      },
      major: {
        vi: "Lớp CBA5 - Khối Tự nhiên",
        en: "Class CBA5 - Natural Sciences",
      },
      detail: {
        vi: "Nền tảng vững chắc về Toán học, Vật lý và Tin học. Bắt đầu tiếp cận lập trình và nguyên lý động cơ từ những năm học trung học phổ thông.",
        en: "Strong foundational knowledge in Mathematics, Physics, and Computer Science. Initiated early self-study in algorithmic thinking and mechanical engineering.",
      },
    },
  ],
  experience: [
    {
      period: "2022 - Hiện tại",
      role: {
        vi: "Lập trình viên Backend & Nghiên cứu Phần mềm Ô tô",
        en: "Backend Developer & Automotive Software Researcher",
      },
      organization: {
        vi: "Dự án Cá nhân & Nghiên cứu Độc lập",
        en: "Independent Research & Personal Projects",
      },
      description: {
        vi: "Phát triển các API RESTful và dịch vụ WebSocket hiệu năng cao với Spring Boot, FastAPI và Node.js. Xây dựng giải pháp giải mã bản tin CAN bus và chẩn đoán mã lỗi OBD-II ứng dụng mô hình Machine Learning với TensorFlow.",
        en: "Engineered high-throughput REST APIs and real-time WebSocket pipelines with Spring Boot, FastAPI, and Node.js. Built CAN bus reverse telemetry decoders and automated OBD-II diagnostic classification models using TensorFlow.",
      },
      tags: ["Spring Boot", "FastAPI", "TensorFlow", "CAN Bus", "OBD-II", "Docker"],
      type: "software",
    },
    {
      period: "2020 - 2021",
      role: {
        vi: "Chuyên viên Dịch vụ Số & Quản trị Hệ thống",
        en: "Digital Services & Social Platform Specialist",
      },
      organization: {
        vi: "Hoạt động Tự do (Freelance)",
        en: "Freelance",
      },
      description: {
        vi: "Tối ưu hóa quy trình bảo mật, xử lý tương tác số và quản lý tài khoản mạng xã hội quy mô lớn cho các cá nhân và doanh nghiệp nhỏ.",
        en: "Optimized digital workflows, security protocols, and high-volume social media engagement infrastructure for creators and small businesses.",
      },
      tags: ["Automation", "Security", "Digital Systems"],
      type: "other",
    },
  ],
};

export const profileData = PROFILE;
