const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;
const SETTINGS_FILE = path.join(__dirname, 'developer-settings.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

const upload = multer({ dest: UPLOADS_DIR });

// جلب الإعدادات
app.get('/api/developer-settings', (req, res) => {
    if (!fs.existsSync(SETTINGS_FILE)) return res.json({});
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    res.json(JSON.parse(data));
});

// حفظ الإعدادات (مع رفع الصور)
app.post('/api/developer-settings', upload.fields([
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
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    res.json({ success: true, settings });
});

app.listen(PORT, () => {
    console.log(`Developer settings API running on http://localhost:${PORT}`);
});
