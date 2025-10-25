# 1. ใช้ Node.js image พื้นฐาน (alpine คือเวอร์ชันเล็ก)
FROM node:18-alpine

# 2. สร้างโฟลเดอร์ทำงานใน container
WORKDIR /app

# 3. คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# 4. ติดตั้ง dependencies
RUN npm install

# 5. คัดลอกไฟล์ทั้งหมดเข้าไป
COPY . .

# 6. สร้างโฟลเดอร์ uploads
RUN mkdir -p uploads

# 7. บอกว่า container นี้จะใช้ port 3000
EXPOSE 3000

# 8. สั่งให้รันโปรแกรม
CMD [ "node", "server.js" ]
