import { PostItem } from "@/types";

export const POSTS: PostItem[] = [
  {
    id: "gemini-obd2-diagnostics",
    slug: "gemini-obd2-diagnostics",
    title: {
      vi: "Ứng Dụng Mô Hình AI Gemini Vào Phân Tích & Chẩn Đoán Mã Lỗi OBD-II Ô Tô",
      en: "Applying Google Gemini AI Models to Real-Time OBD-II Vehicle Diagnostics",
    },
    excerpt: {
      vi: "Khám phá cách kết hợp mô hình đa phương thức Google Gemini để phân tích tức thì các mã lỗi DTC phức tạp, đối chiếu thông số cảm biến thời gian thực và đề xuất giải pháp sửa chữa chính xác cho kỹ thuật viên.",
      en: "Discover how to harness Google Gemini multimodal models to diagnose complex DTC fault codes, correlate real-time telemetry parameters, and generate precision remediation steps for technicians.",
    },
    content: {
      vi: `## Giới thiệu về Chẩn đoán OBD-II trong Kỷ nguyên AI

Trong ngành công nghiệp ô tô hiện đại, hệ thống chẩn đoán tự động trên xe (On-Board Diagnostics - OBD-II) là tiêu chuẩn bắt buộc cho mọi dòng xe thương mại. Cổng giao tiếp OBD-II cho phép kỹ thuật viên truy xuất các mã lỗi chẩn đoán (Diagnostic Trouble Codes - DTC) như P0300 (Misfire ngẫu nhiên), P0420 (Hiệu suất bộ chuyển đổi xúc tác dưới ngưỡng), hay P0171 (Hỗn hợp nhiên liệu quá nghèo).

Tuy nhiên, một mã lỗi thường chỉ là "triệu chứng bề mặt". Ví dụ, mã P0171 có thể xuất phát từ:
- Cảm biến lưu lượng khí nạp (MAF) bị bẩn hoặc hỏng
- Rò rỉ đường ống chân không (Vacuum leak)
- Áp suất bơm nhiên liệu yếu
- Kim phun xăng bị tắc nghẽn

Đây chính là điểm mà **Google Gemini AI** tạo ra sự đột phá.

### Kiến trúc Tích hợp: Telemetry Pipeline đến Gemini Agent

Quy trình kết nối dữ liệu được thiết kế theo 3 tầng chính:
1. **Thu thập dữ liệu tại xe**: Vi điều khiển ESP32 kết nối với CAN transceiver MCP2515 hoặc adapter ELM327 Bluetooth/Wi-Fi để đọc các PID tiêu chuẩn (Engine RPM, Coolant Temp, Short Term Fuel Trim, Long Term Fuel Trim, O2 Sensor Voltages).
2. **Xử lý trung gian (Edge Gateway)**: Dữ liệu được đóng gói dưới dạng JSON chuẩn hóa và gửi lên Backend (FastAPI hoặc Spring Boot) qua kết nối an toàn WebSocket/MQTT.
3. **Phân tích với Gemini API**: Backend tạo prompt kỹ thuật có cấu trúc (Structured Prompt) kết hợp:
   - Mã lỗi hiện tại và mã lỗi lịch sử
   - Dải thông số hoạt động khi xảy ra lỗi (Freeze Frame Data)
   - Thông tin dòng xe (Hãng sản xuất, năm, mã động cơ)

\`\`\`json
{
  "vin": "1HGCR2F83HA000000",
  "dtc_code": "P0171",
  "freeze_frame": {
    "engine_rpm": 2150,
    "coolant_temp_c": 88,
    "stft_bank1_pct": 18.5,
    "ltft_bank1_pct": 21.0,
    "maf_flow_gps": 2.15,
    "vehicle_speed_kph": 65
  }
}
\`\`\`

### Kết quả Thực nghiệm

Khi đưa dữ liệu Freeze Frame trên vào mô hình Gemini 1.5 Flash / Pro với system instruction chuyên môn kỹ thuật ô tô, mô hình ngay lập tức chỉ ra rằng tỉ lệ Long Term Fuel Trim (+21%) kết hợp với lưu lượng MAF thấp bất thường tại tốc độ vòng tua 2,150 RPM là dấu hiệu đặc trưng của việc cảm biến MAF bị bám muội bẩn hoặc có khe hở chân không sau cổ hút.

Thời gian phân tích chỉ mất chưa đầy 1.2 giây, giúp giảm tới 60% thời gian tháo lắp kiểm tra thực địa cho người thợ!`,
      en: `## Introduction to OBD-II Diagnostics in the AI Era

In modern automotive engineering, On-Board Diagnostics (OBD-II) serves as the ubiquitous heartbeat monitor for modern passenger and commercial vehicles. Standardized diagnostic ports expose Diagnostic Trouble Codes (DTCs) such as P0300 (Random Misfire), P0420 (Catalyst System Efficiency Below Threshold), or P0171 (System Too Lean Bank 1).

However, DTCs frequently act merely as symptoms rather than definitive root causes. A lean condition (P0171) can stem from dirty Mass Air Flow (MAF) wires, intake vacuum leaks, failing fuel pumps, or partially clogged injectors.

This is precisely where **Google Gemini AI** transforms mechanical troubleshooting.

### The Pipeline Architecture: Telemetry to Gemini Agent

The solution orchestrates three unified layers:
1. **In-Vehicle Telemetry Capture**: An ESP32 micro-controller interfaced with an MCP2515 CAN transceiver or ELM327 hardware queries standard SAE J1979 PIDs.
2. **Edge Gateway Processing**: Telemetry packets are formatted into structured schemas and streamed via secure WebSockets to a FastAPI/Spring Boot ingestion backend.
3. **Gemini Reasoning**: The engine composes a structured contextual prompt containing the active fault, historical freeze-frame data, and vehicle metadata.

\`\`\`json
{
  "vin": "1HGCR2F83HA000000",
  "dtc_code": "P0171",
  "freeze_frame": {
    "engine_rpm": 2150,
    "coolant_temp_c": 88,
    "stft_bank1_pct": 18.5,
    "ltft_bank1_pct": 21.0,
    "maf_flow_gps": 2.15,
    "vehicle_speed_kph": 65
  }
}
\`\`\`

### Experimental Validation

Passing this freeze frame into Gemini with fine-tuned automotive system instructions instantly correlates the +21% Long Term Fuel Trim with depressed mass air flow at 2,150 RPM, isolating dirty MAF hot-wires as the 85% probability culprit within 1.2 seconds!`,
    },
    date: "20 Tháng 11, 2024",
    category: "AI & Automotive",
    tags: ["Gemini AI", "OBD-II", "Automotive", "FastAPI", "Python"],
    readTime: "6 phút",
    coverImage: "/assets/picture 1.jpg",
    author: "Phạm Minh Hiếu",
  },
  {
    id: "spring-boot-iot-telematics",
    slug: "spring-boot-iot-telematics",
    title: {
      vi: "Xây Dựng High-Performance Backend Cho Hệ Thống Telematics Ô Tô Với Spring Boot & Redis",
      en: "Building High-Throughput Automotive Telematics Backends with Spring Boot & Redis",
    },
    excerpt: {
      vi: "Chiến lược thiết kế kiến trúc phân tán chịu tải cao, tối ưu hóa bộ nhớ đệm đa tầng và xử lý hàng triệu bản tin tọa độ GPS cùng trạng thái xe mỗi phút.",
      en: "Architectural strategies for engineering high-concurrency telematics ingest backends, leveraging multi-level caching and processing high-frequency vehicle telemetry with zero drops.",
    },
    content: {
      vi: `## Thách thức Về Tải trong Hệ thống Viễn thông Ô tô (Telematics)

Một đội xe vận tải 5,000 xe, mỗi xe truyền gói tin vị trí và trạng thái cảm biến với tần suất 2 giây/lần, sẽ tạo ra lưu lượng liên tục xấp xỉ 2,500 requests/giây gửi về máy chủ trung tâm. Nếu lưu trực tiếp vào cơ sở dữ liệu quan hệ (RDBMS) như PostgreSQL mà không có bộ đệm trung gian, tình trạng tắc nghẽn I/O và khóa hàng (row locking) chắc chắn sẽ xảy ra.

### Giải pháp Kiến trúc với Spring Boot 3 và Redis

Để giải quyết bài toán trên, kiến trúc phân tán gồm các mắt xích:
1. **Ingestion Endpoint Non-blocking**: Sử dụng Spring WebFlux hoặc Tomcat Thread Pool đã được tinh chỉnh kích thước (\`max-threads=400\`, \`accept-count=1000\`).
2. **Buffer Tốc độ cao với Redis List / Streams**: Dữ liệu cảm biến thô từ xe sau khi giải mã lập tức được đẩy vào Redis Stream (\`XADD\`). Thao tác này hoàn tất trong dưới 2 mili-giây trên RAM.
3. **Worker Service Bất đồng bộ**: Các worker ngầm sử dụng cơ chế Consumer Group của Redis để lấy bản tin theo lô (batch of 100 records), tổng hợp và ghi vào TimescaleDB / PostgreSQL.
4. **Caching Vị trí mới nhất**: Tọa độ và trạng thái hiện tại của xe được lưu dưới dạng Redis Hash (\`HSET vehicle:loc:{id}\`), cho phép ứng dụng Web và Mobile truy vấn trạng thái tức thì không cần chạm vào ổ cứng.

### Kết quả đo lường tải

Qua kiểm thử với k6 trên cấu hình máy chủ 4 vCPU, 8GB RAM:
- Thông lượng đạt được: **4,850 requests/giây**
- Độ trễ phản hồi trung bình (p95): **18.2ms**
- Tỷ lệ lỗi (Error rate): **0.00%**`,
      en: `## The Scale Challenge in Fleet Telematics

A modest commercial fleet of 5,000 vehicles broadcasting telemetry every 2 seconds creates a relentless ingestion load of 2,500 requests/second. Direct inserts into relational databases like PostgreSQL rapidly succumb to disk I/O bottlenecks and connection starvation.

### Architectural Solution with Spring Boot 3 & Redis

1. **Non-blocking Ingestion**: High-throughput controllers tuned with optimized thread pools.
2. **In-Memory Buffering**: Raw CAN frames immediately push to Redis Streams (\`XADD\`) with sub-2ms latency.
3. **Decoupled Batch Workers**: Background consumer groups drain stream batches into TimescaleDB.
4. **Fast State Caching**: Vehicle real-time snapshots reside in Redis Hashes for zero-disk client queries.

### Load Test Results

Benchmarked with k6 on 4 vCPUs:
- Sustained throughput: **4,850 reqs/sec**
- Average latency (p95): **18.2ms**
- Failure rate: **0.00%**`,
    },
    date: "05 Tháng 12, 2024",
    category: "Backend",
    tags: ["Spring Boot", "Redis", "Microservices", "Java", "Docker"],
    readTime: "7 phút",
    coverImage: "/assets/picture 2.jpg",
    author: "Phạm Minh Hiếu",
  },
  {
    id: "ev-battery-management-trends",
    slug: "ev-battery-management-trends",
    title: {
      vi: "Xu Hướng Xe Điện Hóa & Thách Thức Hệ Thống Quản Lý Pin (BMS) Tại Việt Nam",
      en: "Electric Vehicle Transition & Battery Management System (BMS) Challenges in Vietnam",
    },
    excerpt: {
      vi: "Phân tích kỹ thuật chuyên sâu về các thuật toán ước lượng trạng thái sạc (SoC), trạng thái suy giảm sức khỏe (SoH) của pin Lithium-ion trong điều kiện khí hậu nhiệt đới gió mùa.",
      en: "In-depth engineering analysis of State of Charge (SoC) and State of Health (SoH) estimation algorithms for Lithium-ion cells under tropical high-temperature operating conditions.",
    },
    content: {
      vi: `## Bối cảnh Chuyển dịch Xe Điện (EV)

Ngành công nghiệp ô tô toàn cầu nói chung và Việt Nam nói riêng đang bước vào giai đoạn tăng trưởng bùng nổ của phương tiện giao thông thuần điện (Battery Electric Vehicle - BEV). Trái tim của mọi chiếc xe điện là bộ pin điện áp cao (High Voltage Battery Pack), thường dao động từ 350V đến 800V.

Bộ não giám sát và bảo vệ khối pin này chính là **Battery Management System (BMS)**.

### Thách thức Đặc thù tại Khí hậu Nhiệt đới Việt Nam

Nhiệt độ môi trường mùa hè tại Việt Nam thường xuyên vượt ngưỡng 38°C - 42°C trên mặt đường nhựa. Pin Lithium-ion (đặc biệt là hóa chất NMC và LFP) rất nhạy cảm với nhiệt độ:
- Khi nhiệt độ cell pin vượt quá 45°C: Tốc độ suy thoái hóa học (Degradation) tăng gấp đôi.
- Khi chênh lệch nhiệt độ giữa các cell vượt quá 5°C: Dẫn đến hiện tượng mất cân bằng dung lượng, suy giảm phạm vi di chuyển (Range drop).

### Các Thuật toán Cốt lõi của BMS Hiện đại

1. **Ước lượng Trạng thái Sạc (State of Charge - SoC)**: Sử dụng thuật toán Bộ lọc Kalman mở rộng (Extended Kalman Filter - EKF) kết hợp đếm Coulomb để khử nhiễu sai số tích lũy.
2. **Ước lượng Sức khỏe Pin (State of Health - SoH)**: Theo dõi sự gia tăng nội trở (Internal Resistance) và suy giảm dung lượng thực tế theo từng chu kỳ sạc-xả.
3. **Cân bằng Cell Chủ động (Active Balancing)**: Chuyển năng lượng từ cell có điện áp cao sang cell có điện áp thấp qua cuộn cảm thay vì chỉ đốt cháy điện trở tỏa nhiệt lãng phí (Passive Balancing).`,
      en: `## The Electric Vehicle Transformation

Electric mobility in Southeast Asia is accelerating at unprecedented velocity. The central core of every modern EV is its High Voltage Battery Pack (350V - 800V), governed continuously by the **Battery Management System (BMS)**.

### Engineering Challenges in Tropical Environments

Ambient surface temperatures routinely hit 40°C+. Lithium cells under sustained high heat experience accelerated thermal aging and cell imbalance.

### Core Algorithmic Tenets in Modern BMS

1. **State of Charge (SoC) Estimation**: Extended Kalman Filters (EKF) combined with Coulomb counting compensate for sensor drift.
2. **State of Health (SoH)**: Continuous electrochemical impedance tracking across charge cycles.
3. **Active Cell Balancing**: Inductive charge shuttle transferring energy between cell nodes with minimal thermal dissipation.`,
    },
    date: "12 Tháng 1, 2025",
    category: "Automotive",
    tags: ["EV", "BMS", "Battery Tech", "Engineering", "Automotive"],
    readTime: "8 phút",
    coverImage: "/assets/picture 3.jpg",
    author: "Phạm Minh Hiếu",
  },
];

export const posts = POSTS;
