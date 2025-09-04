# 🕋 Nusuk Website | نسك ويب

![nusuk_website Banner](https://github.com/vv7x-x/nusuk_website/blob/main/uploads/images/logo.png)

---

## 📌 نبذة | About
موقع ويب عصري متعدد الصفحات لخدمات الحج والعمرة والسياحة، بواجهة متجاوبة وديناميكية، مع نظام حجز متكامل وتحويل تلقائي لجروب واتساب.  
Modern multi-page website for Hajj, Umrah, and tourism services with a responsive, dynamic UI, booking system, and WhatsApp group redirection.

---

## ✨ المميزات | Features
- 🎨 واجهة عصرية متجاوبة مع أنيميشن (AOS.js).  
- 🔗 روابط نظيفة بدون `.html` عبر إعدادات Vercel.  
- 📅 نظام حجز متكامل مع تحويل مباشر للواتساب.  
- ⚙️ تخصيص التصميم (ألوان، خطوط، خلفيات) عبر LocalStorage.  
- 📂 إمكانية إضافة صفحات جديدة بسهولة وتنظيم تلقائي.  
- 🔊 دعم الصوتيات والمؤثرات لكل صفحة.  
- 🛠️ سكريبتات ديناميكية لتفعيل الصفحة النشطة وتغيير العناوين.  
- ⚡ إعدادات متقدمة عبر لوحة تحكم خاصة.  

---

## 🛠️ التقنيات | Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), AOS.js  
- **Backend:** Node.js, Express  
- **Hosting:** Vercel (مع دعم rewrites)  
- **Embeds:** Sketchfab/3D (دليل مناسك تفاعلي)  

---

## 📂 هيكلية المشروع | Project Structure
/
├── index.html
├── about.html
├── booking.html
├── contact.html
├── gallery.html
├── offers.html
├── developer-info.html
├── hacker-advanced-panel.html
├── hacker-advanced-panel-pro.html
├── pages/
├── uploads/
│ ├── الأصوات/
│ ├── رحلاتنا السابقه/
│ └── images/
├── robots.txt
├── sitemap.xml
└── sitemap-generator.js




---

## ▶️ التشغيل محليًا | Run Locally


git clone https://github.com/vv7x-x/nusuk_website.git
cd nusuk_website
node main.js
افتح index.html مباشرة أو عبر Live Server.

جميع الروابط تعمل بدون .html بفضل إعدادات vercel.json.

📬 نظام الحجز | Booking System
عند تعبئة نموذج الحجز يتم إرسال البيانات لـ Node.js API ثم يتم تحويل المستخدم مباشرةً إلى جروب واتساب.

Request Example:

json
نسخ الكود
POST /api/booking
{
  "name": "User Name",
  "phone": "+201234567890",
  "trip": "Umrah 2025"
}
Response Example:

json
نسخ الكود
{
  "status": "success",
  "redirect": "https://chat.whatsapp.com/example-group"
}
🗺️ خريطة الطريق | Roadmap
تحسين تصميم الواجهة.

إضافة دعم لغات أخرى بجانب العربية والإنجليزية.

تحسين تجربة لوحة التحكم.

تحسين التكامل مع محركات البحث (SEO).

📄 الرخصة | License
This project is licensed under CC BY-NC-ND 4.0.
يمكن استخدامه للأغراض غير التجارية فقط، مع نسب الحقوق، ودون تعديلات أو أعمال مشتقة.
🔗 Read more

📬 التواصل | Contact
📧 Email: yvhyvredv@gmail.com

🌐 Live Demo

شكراً لاستخدامك مشروع nusuk_website! | Thanks for using nusuk_website!

