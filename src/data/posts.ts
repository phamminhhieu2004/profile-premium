import { PostItem } from "@/types";

export const POSTS: PostItem[] = [
  {
    id: "gemini-obd2-diagnostics",
    slug: "gemini-obd2-diagnostics",
    title: {
      vi: "Chill chill tại quán Chốn Coffee nè",
      en: "Chilling at Chốn Coffee",
    },
    excerpt: {
      vi: "Ngồi đây vừa học bài vừa ngắm cảnh thì vô địch luôn các bro ơi.",
      en: "Sitting here studying while taking in the view is absolutely unbeatable, guys.",
    },
    content: {
      vi: `## Giới thiệu về Chốn Coffee

À mà cũng chẳng có gì để giới thiệu, cứ ra trải nghiệm thử là biết ngay
Địa chỉ: Số nhà 1, Tổ 41, phường Phan Đình Phùng (cạnh cầu vượt Đồng Quang, sau nhà F88), TP. Thái Nguyên.`,
      en: `## About Chốn Coffee

Honestly, there isn't really much to describe—just come by and experience the vibe for yourself!
Address: No. 1, Group 41, Phan Dinh Phung Ward (next to Dong Quang overpass, behind F88), Thai Nguyen City.`,
    },
    date: "19 Tháng 9, 2026",
    category: "Life & Chill",
    tags: ["Coffee", "Lifestyle", "Thai Nguyen", "Chill"],
    readTime: "2 phút",
    coverImage: "/assets/picture 1.jpg",
    author: "Phạm Minh Hiếu",
  },
  {
    id: "spring-boot-iot-telematics",
    slug: "spring-boot-iot-telematics",
    title: {
      vi: "Đú trend thành sư này haha",
      en: "Following this trend to become a master, haha.",
    },
    excerpt: {
      vi: "Đú bằng công nghệ tân tiến của Gemini đó.",
      en: "Following the trend with Gemini's advanced AI.",
    },
    content: {
      vi: `Gemini thì xịn khỏi phải bàn cãi rồi đúng không các bro`,
      en: `Gemini is really cool, isn't it, guys?`,
    },
    date: "11 Tháng 7, 2026",
    category: "AI",
    tags: ["AI", "LLM", "Machine Learning", "AI MODE", "AI AGENT"],
    readTime: "3 phút",
    coverImage: "/assets/picture 2.jpg",
    author: "Phạm Minh Hiếu",
  },
  {
    id: "ev-battery-management-trends",
    slug: "ev-battery-management-trends",
    title: {
      vi: "Đi chơi một mình nè",
      en: "Going out by myself",
    },
    excerpt: {
      vi: "Đi chơi một mình nhiều bị nhàm, ước có người yêu đi chơi cùng",
      en: "Going out alone too much gets boring, wish I had someone to go out with.",
    },
    content: {
      vi: `Mệt mỏi quá các tình yêu ơi`,
      en: `I'm so exhausted, my loves.`,
    },
    date: "20 Tháng 3, 2026",
    category: "Hang out",
    tags: ["Hang out", "Chill", "Home", "Alone", "Girl Friend"],
    readTime: "8 phút",
    coverImage: "/assets/picture 3.jpg",
    author: "Phạm Minh Hiếu",
  },
];

export const posts = POSTS;
