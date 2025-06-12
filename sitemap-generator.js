const fs = require('fs');
const path = require('path');

// إعداد المسارات الأساسية
const baseUrl = 'https://khutwa-website-wine.vercel.app';
const pages = [
  'index.html',
  'about.html',
  'offers.html',
  'gallery.html',
  'contact.html',
  'booking.html',
  'developer-info.html'
];

// إنشاء محتوى ملف sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// كتابة الملف
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);

console.log('تم إنشاء ملف sitemap.xml بنجاح!');
