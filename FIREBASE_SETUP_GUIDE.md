# 🔥 Firebase Setup Guide สำหรับ Fadia Bakery

## 📋 **ขั้นตอนการตั้งค่า Firebase**

### 1. **เปิดใช้งาน Authentication**
1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. เลือกโปรเจค `fadiabkry-8fae6`
3. ไปที่ **Authentication** → **Sign-in method**
4. คลิก **Email/Password** และเปิดใช้งาน
5. คลิก **Save**

### 2. **สร้างบัญชีเจ้าของร้าน**
1. ไปที่ **Authentication** → **Users**
2. คลิก **Add user**
3. กรอกข้อมูล:
   - **Email**: `fadia@bkr.web.app`
   - **Password**: [ตั้งรหัสผ่านที่ต้องการ]
4. คลิก **Add user**

### 3. **สร้าง Collections ใน Firestore**

#### Collection: `members`
```
Document ID: [Auto-generated]
Fields:
- name (string): ชื่อ-นามสกุล
- email (string): อีเมล
- phone (string): เบอร์โทรศัพท์
- address (string): ที่อยู่
- memberType (string): "regular" หรือ "vip"
- joinDate (timestamp): วันที่สมัคร
- preferences (map):
  - notifications (boolean): การแจ้งเตือน
  - workshops (boolean): Workshop
  - promotions (boolean): โปรโมชั่น
```

#### Collection: `news`
```
Document ID: [Auto-generated]
Fields:
- title (string): หัวข้อข่าว
- content (string): เนื้อหาข่าว
- createdAt (timestamp): วันที่สร้าง
- published (boolean): สถานะเผยแพร่
```

#### Collection: `workshops`
```
Document ID: [Auto-generated]
Fields:
- title (string): ชื่อ Workshop
- description (string): รายละเอียด
- date (timestamp): วันที่จัด
- createdAt (timestamp): วันที่สร้าง
- active (boolean): สถานะใช้งาน
```

#### Collection: `custom_orders`
```
Document ID: [Auto-generated]
Fields:
- customerName (string): ชื่อลูกค้า
- customerEmail (string): อีเมลลูกค้า
- customerPhone (string): เบอร์โทรลูกค้า
- size (string): ขนาดเค้ก
- flavor (string): รสชาติ
- frosting (string): ครีม
- color (string): สี
- style (string): สไตล์
- message (string): ข้อความบนเค้ก
- pickupDate (timestamp): วันที่รับ
- specialRequests (string): คำขอพิเศษ
- status (string): "pending", "confirmed", "completed"
- createdAt (timestamp): วันที่สร้าง
```

#### Collection: `feedback`
```
Document ID: [Auto-generated]
Fields:
- type (string): ประเภทข้อเสนอแนะ
- subject (string): หัวข้อ
- details (string): รายละเอียด
- contactName (string): ชื่อผู้ติดต่อ
- contactPhone (string): เบอร์โทรผู้ติดต่อ
- createdAt (timestamp): วันที่สร้าง
```

### 4. **ตั้งค่า Firestore Security Rules**

ไปที่ **Firestore Database** → **Rules** และวางโค้ดนี้:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Members collection - authenticated users can read/write their own data
    match /members/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.email == 'fadia@bkr.web.app';
    }
    
    // News collection - public read, admin write
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'fadia@bkr.web.app';
    }
    
    // Workshops collection - public read, admin write
    match /workshops/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'fadia@bkr.web.app';
    }
    
    // Custom orders - authenticated users can create, admin can read/write
    match /custom_orders/{document} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null && request.auth.token.email == 'fadia@bkr.web.app';
    }
    
    // Feedback - anyone can create, admin can read
    match /feedback/{document} {
      allow create: if true;
      allow read: if request.auth != null && request.auth.token.email == 'fadia@bkr.web.app';
    }
  }
}
```

### 5. **ทดสอบการทำงาน**

1. รันเว็บไซต์:
```bash
cd /home/h4n/hello-docker
PORT=3001 node server.js
```

2. ทดสอบการสมัครสมาชิก:
   - ไปที่ `http://localhost:3001/member-register`
   - กรอกข้อมูลและสมัครสมาชิก

3. ทดสอบการล็อกอิน:
   - ไปที่ `http://localhost:3001/member-login`
   - ล็อกอินด้วยบัญชีที่สร้าง

4. ทดสอบการล็อกอินเจ้าของร้าน:
   - ใช้อีเมล: `fadia@bkr.web.app`
   - ใช้รหัสผ่านที่ตั้งไว้

## 🔧 **การแก้ไขปัญหาที่อาจเกิดขึ้น**

### ปัญหา: "Firebase: Error (auth/user-not-found)"
**วิธีแก้**: ตรวจสอบว่าบัญชีถูกสร้างใน Firebase Authentication แล้ว

### ปัญหา: "Firebase: Error (auth/wrong-password)"
**วิธีแก้**: ตรวจสอบรหัสผ่านที่กรอก

### ปัญหา: "Firebase: Error (permission-denied)"
**วิธีแก้**: ตรวจสอบ Firestore Security Rules

### ปัญหา: "Firebase: Error (collection-not-found)"
**วิธีแก้**: ตรวจสอบว่า collections ถูกสร้างใน Firestore แล้ว

## 📊 **การตรวจสอบข้อมูล**

### ตรวจสอบใน Firebase Console:
1. **Authentication** → **Users**: ดูบัญชีผู้ใช้
2. **Firestore Database** → **Data**: ดูข้อมูลใน collections
3. **Firestore Database** → **Rules**: ตรวจสอบ security rules

### ตรวจสอบใน Browser Console:
1. เปิด Developer Tools (F12)
2. ไปที่ Console tab
3. ดู error messages ที่แสดง

## 🎯 **ข้อมูลสำหรับทดสอบ**

### บัญชีเจ้าของร้าน:
- **Email**: `fadia@bkr.web.app`
- **Password**: [รหัสผ่านที่คุณตั้งไว้]

### ข้อมูลทดสอบสมาชิก:
- **Name**: ทดสอบ ทดสอบ
- **Email**: test@example.com
- **Phone**: 081-234-5678
- **Address**: 123 ถนนทดสอบ กรุงเทพฯ 10110

## ✅ **Checklist การตั้งค่า**

- [ ] เปิดใช้งาน Email/Password Authentication
- [ ] สร้างบัญชี `fadia@bkr.web.app`
- [ ] สร้าง collection `members`
- [ ] สร้าง collection `news`
- [ ] สร้าง collection `workshops`
- [ ] สร้าง collection `custom_orders`
- [ ] สร้าง collection `feedback`
- [ ] ตั้งค่า Firestore Security Rules
- [ ] ทดสอบการสมัครสมาชิก
- [ ] ทดสอบการล็อกอินสมาชิก
- [ ] ทดสอบการล็อกอินเจ้าของร้าน

---

**🍰 Fadia Bakery** - Firebase Setup Complete! 💖
