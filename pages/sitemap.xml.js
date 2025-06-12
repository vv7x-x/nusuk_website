// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://khutwa-website-wine.vercel.app';

  const staticPages = [
    '',
    'about.html',
    'booking.html',
    'contact.html',
    'developer-info.html',
    'gallery.html',
    'offers.html',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(page => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
      </url>`).join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
