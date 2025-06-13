const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync(path.join(__dirname, 'uploads'))) fs.mkdirSync(path.join(__dirname, 'uploads'));

// إعدادات عامة (مثال: من نحن)
app.get('/api/about', (req, res) => {
  const file = path.join(__dirname, 'about.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/about', (req, res) => {
  const file = path.join(__dirname, 'about.json');
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// إعدادات المطور (مع رفع الصور)
const upload = multer({ dest: path.join(__dirname, 'uploads') });
app.get('/api/developer', (req, res) => {
  const file = path.join(__dirname, 'developer.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/developer', upload.fields([
  { name: 'developerPhoto', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), (req, res) => {
  let settings = req.body;
  if (req.files['developerPhoto']) {
    settings.developerPhoto = '/uploads/' + req.files['developerPhoto'][0].filename;
  }
  if (req.files['logo']) {
    settings.logo = '/uploads/' + req.files['logo'][0].filename;
  }
  const file = path.join(__dirname, 'developer.json');
  fs.writeFileSync(file, JSON.stringify(settings, null, 2));
  res.json({ success: true, settings });
});

// عروض
app.get('/api/offers', (req, res) => {
  const file = path.join(__dirname, 'offers.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/offers', (req, res) => {
  const file = path.join(__dirname, 'offers.json');
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// اتصل بنا
app.get('/api/contact', (req, res) => {
  const file = path.join(__dirname, 'contact.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/contact', (req, res) => {
  const file = path.join(__dirname, 'contact.json');
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// الحجز
app.get('/api/booking', (req, res) => {
  const file = path.join(__dirname, 'booking.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/booking', (req, res) => {
  const file = path.join(__dirname, 'booking.json');
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// معرض الصور
app.get('/api/gallery', (req, res) => {
  const file = path.join(__dirname, 'gallery.json');
  if (!fs.existsSync(file)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});
app.post('/api/gallery', (req, res) => {
  const file = path.join(__dirname, 'gallery.json');
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
