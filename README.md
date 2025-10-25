# 🍰 Fadia Bakery - เว็บไซต์ร้านเค้ก

เว็บไซต์ร้านเค้ก Fadia Bakery ที่ออกแบบโดยคำนึงถึง User Journey ของลูกค้าเป็นหลัก ตั้งแต่การเข้ามาชมร้าน, การเลือกซื้อเค้ก, ไปจนถึงขั้นตอนที่สำคัญที่สุดคือการสั่งทำเค้กในฝันของพวกเขา

## ✨ คุณสมบัติหลัก

### 🏠 หน้าแรก (Homepage)
- **Hero Section**: ต้อนรับลูกค้าด้วยข้อความอบอุ่นและปุ่ม Call-to-Action ที่ชัดเจน
- **Best Sellers**: แสดงเค้กยอดนิยมพร้อมรูปภาพสวยงาม
- **Custom Cake Showcase**: อธิบายขั้นตอนการสั่งทำเค้กแบบง่ายๆ 3 ขั้นตอน
- **Customer Testimonials**: รีวิวจากลูกค้าจริงเพื่อสร้างความน่าเชื่อถือ

### 🍰 หน้าสินค้าทั้งหมด (Product Catalog)
- **Filter & Sort**: กรองตามหมวดหมู่และเรียงลำดับตามความต้องการ
- **Product Grid**: แสดงสินค้าในรูปแบบการ์ดที่สวยงาม
- **Interactive Features**: Hover effects และปุ่มเพิ่มลงตะกร้า

### 🎨 หน้าสั่งทำเค้กพิเศษ (Custom Cake Order)
- **Multi-Step Form**: แบ่งขั้นตอนเป็น 3 ส่วนเพื่อความง่ายในการใช้งาน
- **Step 1**: เลือกขนาด รสชาติเนื้อเค้ก และรสชาติครีม
- **Step 2**: ออกแบบธีมสี สไตล์การตกแต่ง และข้อความบนเค้ก
- **Step 3**: รายละเอียดการติดต่อและคำขอพิเศษ
- **File Upload**: อัปโหลดรูปภาพอ้างอิงได้

### 💌 หน้าส่งข้อเสนอแนะ (Feedback & Suggestions)
- **User-Friendly Form**: แบบฟอร์มที่ใช้งานง่ายและครอบคลุม
- **File Attachment**: แนบไฟล์รูปภาพหรือเอกสารได้
- **Multiple Categories**: เลือกประเภทข้อเสนอแนะได้หลากหลาย

## 🎨 Design System

### Color Palette
- **Primary Pink** (#E75480): สีชมพูหลักสำหรับปุ่ม Call-to-Action
- **Pastel Pink** (#FADADD): สีชมพูอ่อนสำหรับพื้นหลัง
- **Light Cream** (#FFF8F0): สีพื้นหลังหลักของหน้าเว็บ
- **Soft Gold** (#F0E68C): สีทองอ่อนสำหรับไอคอนและเส้นขอบ
- **Text Gray** (#5C5C5C): สีเทาเข้มสำหรับข้อความหลัก

### Typography
- **Headings**: Quicksand (ฟอนต์กลมมน, ดูเป็นมิตร)
- **Body Text**: Sarabun (อ่านง่าย, สบายตา)

### Component Style
- **Rounded Corners**: ปุ่ม, การ์ด, และ Input Fields มีขอบมน
- **Soft Shadows**: ใช้เงาจางๆ เพื่อสร้างมิติและความนุ่มนวล
- **Cute Icons**: ใช้ไอคอนที่ออกแบบมาโดยเฉพาะ

## 🚀 การติดตั้งและรัน

### Prerequisites
- Node.js 18+
- Docker (optional)

### การติดตั้ง
```bash
# Clone repository
git clone <repository-url>
cd hello-docker

# ติดตั้ง dependencies
npm install

# รันเซิร์ฟเวอร์
npm start
```

### การใช้ Docker
```bash
# Build Docker image
docker build -t fadia-bakery .

# รัน container
docker run -p 3000:3000 fadia-bakery
```

## 📁 โครงสร้างโปรเจค

```
hello-docker/
├── public/                 # Static files
│   ├── index.html         # หน้าแรก
│   ├── products.html      # หน้าสินค้าทั้งหมด
│   ├── custom-order.html # หน้าสั่งทำเค้กพิเศษ
│   ├── feedback.html     # หน้าส่งข้อเสนอแนะ
│   └── styles.css        # CSS หลัก
├── uploads/              # ไฟล์ที่อัปโหลด
├── server.js            # Express server
├── package.json         # Dependencies
├── Dockerfile           # Docker configuration
└── .dockerignore        # Docker ignore file
```

## 🔧 API Endpoints

### POST /api/custom-order
ส่งคำขอสั่งทำเค้กพิเศษ
- **Body**: FormData (multipart/form-data)
- **Response**: JSON with success status and order ID

### POST /api/feedback
ส่งข้อเสนอแนะ
- **Body**: FormData (multipart/form-data)
- **Response**: JSON with success status

## 🌟 คุณสมบัติพิเศษ

- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Smooth Animations**: เอฟเฟกต์การเคลื่อนไหวที่นุ่มนวล
- **File Upload**: รองรับการอัปโหลดไฟล์ด้วย Drag & Drop
- **Form Validation**: ตรวจสอบข้อมูลก่อนส่ง
- **User Experience**: ออกแบบตาม User Journey ที่สมบูรณ์

## 📱 การใช้งาน

1. **เข้าสู่เว็บไซต์**: เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
2. **ชมสินค้า**: ดูเค้กยอดนิยมในหน้าแรก หรือดูทั้งหมดในหน้าสินค้า
3. **สั่งทำเค้ก**: ใช้หน้าสั่งทำเค้กพิเศษเพื่อออกแบบเค้กตามใจ
4. **ส่งข้อเสนอแนะ**: แจ้งความต้องการหรือข้อเสนอแนะผ่านหน้าข้อเสนอแนะ

## 🤝 การมีส่วนร่วม

เรายินดีรับฟังข้อเสนอแนะและความคิดเห็นเพื่อพัฒนาบริการให้ดีขึ้น!

---

**Fadia Bakery** - เติมความหวานให้ทุกโอกาสพิเศษ 🍰💖
# posfadia.githup.io
# posfadia.githup.io
