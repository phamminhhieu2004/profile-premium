import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "100kb" }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests from this IP, please try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact dispatches. Please wait before retrying." },
});

app.use("/api/", globalLimiter);

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.post("/api/contact", contactLimiter, (req: Request, res: Response): void => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    res.status(400).json({ error: "Invalid name: minimum 2 characters required." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    res.status(400).json({ error: "Invalid email format." });
    return;
  }

  if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
    res.status(400).json({ error: "Invalid subject: minimum 2 characters required." });
    return;
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    res.status(400).json({ error: "Invalid message: minimum 10 characters required." });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Contact dispatch received successfully.",
    receivedAt: new Date().toISOString(),
  });
});

app.post("/api/chat", async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message string required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const systemInstruction = `You are the AI Assistant for Pham Minh Hieu's official portfolio.
Pham Minh Hieu is an engineer born in 2004 in Thai Nguyen, Vietnam, studying Automotive Engineering Technology at ICTU (University of Information and Communication Technology).
He specializes in:
- Automotive engineering, CAN Bus telemetry, OBD-II diagnostic protocols, UDS ISO 14229, ECU remapping, engine acoustic analysis.
- Enterprise backend development: Java Spring Boot, Python FastAPI, Node.js/TypeScript Express, PostgreSQL, Redis, Docker.
- Artificial Intelligence: TensorFlow, PyTorch, Google Gemini API, signal classification.
- Key projects: Profile Premium, OBD-II Telemetry Ingestion Hub, AI Engine Acoustic Fault Diagnosis, Spring Boot Distributed Fleet Telematics.
- Certified in Google Gemini AI, Automotive ECU Diagnostics, Deep Learning TensorFlow, Spring Boot.
Always reply helpfully, concisely, and professionally in the user's language (Vietnamese or English).`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const botReply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Pham Minh Hieu specializes in Automotive Engineering, Backend Architecture (Spring Boot / FastAPI), and Applied AI.";
        res.status(200).json({ reply: botReply });
        return;
      }
    } catch {
      // Fallback
    }
  }

  const lower = message.toLowerCase();
  let reply =
    "Chào bạn! Tôi là trợ lý AI đại diện cho Phạm Minh Hiếu. Bạn có thể hỏi tôi về hồ sơ học vấn tại ICTU, kỹ năng chẩn đoán ô tô (CAN Bus / OBD-II), các chứng chỉ Google Gemini & Deep Learning, hoặc dự án backend Spring Boot / FastAPI!";

  if (lower.includes("ai") || lower.includes("gemini") || lower.includes("học") || lower.includes("chứng chỉ")) {
    reply =
      "Phạm Minh Hiếu đã đạt chứng chỉ Google Gemini Certified Professional, Deep Learning with TensorFlow, cùng các chứng chỉ chuyên ngành Điện tử Ô tô & Chẩn đoán ECU (ICAE) và Spring Boot Architecture.";
  } else if (lower.includes("kỹ năng") || lower.includes("skill") || lower.includes("công nghệ")) {
    reply =
      "Kỹ năng trọng tâm của Hiếu gồm: Điện tử & Chẩn đoán ô tô (CAN Bus, OBD-II, UDS), Backend hiện đại (Java Spring Boot, Python FastAPI, Node.js/TypeScript), AI & Học sâu (TensorFlow, PyTorch, Gemini API) và cơ sở dữ liệu (PostgreSQL, Redis, Docker).";
  } else if (lower.includes("dự án") || lower.includes("project") || lower.includes("sản phẩm")) {
    reply =
      "Một số dự án tiêu biểu: 1) Hệ thống giám sát Telemetry xe qua OBD-II thời gian thực; 2) Chẩn đoán lỗi động cơ bằng âm thanh với Deep Learning; 3) Microservices quản lý đội xe viễn thông bằng Spring Boot; 4) Nền tảng Portfolio Premium.";
  } else if (lower.includes("liên hệ") || lower.includes("contact") || lower.includes("email") || lower.includes("sđt")) {
    reply =
      "Bạn có thể liên hệ trực tiếp với Hiếu qua Email: phamminhhieu.work@gmail.com, Điện thoại: 0981 965 241 hoặc qua Telegram/Facebook trong mục Liên Hệ trên website.";
  }

  res.status(200).json({ reply });
});

const clientDistPath = path.resolve(__dirname, "../dist");
app.use(express.static(clientDistPath));

app.get("*", (req: Request, res: Response) => {
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
      if (err) {
        res.status(200).send("Portfolio API Service Online. Please build frontend.");
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening on port ${PORT}`);
});
