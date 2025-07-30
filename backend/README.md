# Khutwa Backend

سيرفر Node.js Express بسيط يدعم استقبال بيانات التواصل وطلبات الحجز من الموقع.

## التشغيل
```bash
cd backend
npm install
npm start
```

## نقاط النهاية (Endpoints)
- POST `/api/contact` : استقبال رسائل التواصل (name, email, message)
- POST `/api/booking` : استقبال طلبات الحجز (name, phone, details)

يمكنك تطويره لاحقًا ليشمل قاعدة بيانات أو مصادقة أو إرسال بريد إلكتروني تلقائي.
