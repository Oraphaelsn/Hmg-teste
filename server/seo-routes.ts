import { Router } from 'express';

const seoRouter = Router();

// Sitemap.xml route
seoRouter.get('/sitemap.xml', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/admin</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/whatsapp</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  res.set('Content-Type', 'text/xml');
  res.send(sitemap);
});

// Robots.txt route
seoRouter.get('/robots.txt', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /whatsapp

# Sitemaps  
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

export default seoRouter;