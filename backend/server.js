const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;
const APPROVED_FILE = path.join(__dirname, 'approved_admins.json');

// إعدادات ميدل وير
app.use(cors());
app.use(bodyParser.json());

// دالة مساعدة لحفظ الإيميلات الموافق عليها
function saveApprovedEmail(email) {
  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(APPROVED_FILE, 'utf8'));
  } catch {}
  if (!list.includes(email)) {
    list.push(email);
    fs.writeFileSync(APPROVED_FILE, JSON.stringify(list, null, 2));
  }
}

// Endpoint للموافقة على الإيميل (يتم استدعاؤه من رابط في الإيميل)
app.get('/api/admin-approve', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).send('Email required');
  saveApprovedEmail(email);
  res.send('تمت الموافقة على هذا البريد ويمكنه الدخول الآن.');
});

// Endpoint للتحقق من الإيميل عند محاولة الدخول
app.post('/api/admin-check', (req, res) => {
  const { email } = req.body;
  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(APPROVED_FILE, 'utf8'));
  } catch {}
  res.json({ approved: list.includes(email) });
});

// إعداد nodemailer لإرسال بريد إلى الأدمن
const ADMIN_EMAIL = 'yvhyvredv@gmail.com'; // بريد الأدمن
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: 'sjyf hpnd judc czed' // ضع كلمة مرور التطبيق هنا
  }
});

// Endpoint لطلب دخول الأدمن
app.post('/api/admin-request', async (req, res) => {
  const { email, ip, city, country } = req.body;
  const approveLink = `https://khutwa-website-wine.vercel.app/api/admin-approve?email=${encodeURIComponent(email)}`;
  const mailOptions = {
    from: ADMIN_EMAIL,
    to: ADMIN_EMAIL,
    subject: 'طلب دخول جديد لصفحة الحجوزات',
    text: `هناك محاولة دخول جديدة لصفحة الحجوزات:\n\nالبريد: ${email}\nIP: ${ip}\nالمدينة: ${city}\nالدولة: ${country}\n\nللموافقة اضغط هنا:\n${approveLink}`
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ success: false, error: 'Mail error' });
  }
});

// Example API endpoint for contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Here you can add logic to save to DB or send email
  console.log('Contact received:', { name, email, message });
  res.json({ success: true, message: 'تم استلام رسالتك بنجاح!' });
});

// تخزين الحجوزات مؤقتاً في الذاكرة (للتجربة فقط)
const bookings = [];

// API endpoint لإضافة حجز
app.post('/api/booking', (req, res) => {
  const { name, phone, details } = req.body;
  const booking = { name, phone, details, date: new Date().toISOString() };
  bookings.push(booking);
  console.log('Booking received:', booking);
  res.json({ success: true, message: 'تم استلام طلب الحجز!', booking });
});

// API endpoint لجلب جميع الحجوزات
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, bookings });
});

app.get('/', (req, res) => {
  res.send('Backend API for Khutwa Website is running.');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  // إرسال رسالة اختبارية عند تشغيل السيرفر
  const mailOptions = {
    from: ADMIN_EMAIL,
    to: ADMIN_EMAIL,
    subject: 'اختبار إرسال بريد من السيرفر',
    text: 'هذه رسالة اختبارية للتأكد من إعدادات الإيميل في khutwa-backend.'
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Mail test error:', err);
    } else {
      console.log('Mail test sent:', info.response);
    }
  });
});
