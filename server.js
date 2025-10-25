const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/custom-order', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'custom-order.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/member-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'member-login.html'));
});

app.get('/member-register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'member-register.html'));
});

app.get('/member-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'member-dashboard.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});

// API Routes
app.post('/api/custom-order', upload.single('referenceImage'), (req, res) => {
  const orderData = req.body;
  console.log('Custom Order Received:', orderData);
  
  // ในระบบจริงจะบันทึกลงฐานข้อมูล
  res.json({ 
    success: true, 
    message: 'ทีมงานได้รับข้อมูลแล้ว และจะรีบติดต่อกลับเพื่อยืนยันรายละเอียดนะคะ!',
    orderId: 'ORD-' + Date.now()
  });
});

app.post('/api/contact', (req, res) => {
  const contactData = req.body;
  console.log('Contact Message Received:', contactData);
  
  res.json({ 
    success: true, 
    message: 'ขอบคุณสำหรับข้อความของคุณ! เราจะรีบติดต่อกลับไปนะคะ'
  });
});

// 404 handler - ต้องอยู่ท้ายสุด
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Fadia Bakery server running at http://localhost:${PORT}/`);
});
