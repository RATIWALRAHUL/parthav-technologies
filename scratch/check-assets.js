const http = require('http');

const assets = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/logo/parthav-logo.png',
  '/images/hero/hero-workspace.webp',
  '/images/hero/avatar-1.webp',
  '/images/hero/avatar-2.webp',
  '/images/hero/avatar-3.webp',
  '/images/work/project-realestate.webp',
  '/images/work/project-healthcare.webp',
  '/images/work/project-ecommerce.webp',
  '/images/about/about-office.webp',
  '/images/hero/cta-map-bg.webp',
  '/images/hero/hero-ambient-bg.webp',
  '/videos/hero-ambient.webm',
];

async function checkAsset(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, status: 'ERROR', error: err.message });
    });
  });
}

(async () => {
  for (const asset of assets) {
    const res = await checkAsset(asset);
    console.log(`${res.status === 200 ? '✓' : '✗'} [${res.status}] ${res.path}`);
  }
})();
