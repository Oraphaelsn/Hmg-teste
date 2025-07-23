// Sitemap XML generation for SEO
export const generateSitemap = () => {
  const baseUrl = 'https://estanciamorrogrande.com.br';
  const pages = [
    {
      url: '/',
      changeFreq: 'weekly',
      priority: '1.0',
      lastMod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/admin',
      changeFreq: 'monthly',
      priority: '0.3',
      lastMod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/whatsapp',
      changeFreq: 'monthly', 
      priority: '0.3',
      lastMod: new Date().toISOString().split('T')[0]
    }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Robots.txt generation
export const generateRobotsTxt = () => {
  const baseUrl = 'https://estanciamorrogrande.com.br';
  
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /whatsapp

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};