const fs = require('fs');

async function checkSite(subdomain) {
  const url = `https://${subdomain}.webflow.io`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    if (res.status === 200) {
      const html = await res.text();
      const mp4s = html.match(/https:\/\/[^"'\s\)]+\.mp4/g) || [];
      const webms = html.match(/https:\/\/[^"'\s\)]+\.webm/g) || [];
      const all = [...new Set([...mp4s, ...webms])];
      if (all.length > 0) {
        console.log(`FOUND on ${url}:`, all);
        return all;
      }
    }
  } catch(e) {}
  return [];
}

async function run() {
  const list = [
    'agency', 'creative-agency', 'digital-agency', 'tech-agency', 'studio',
    'web-agency', 'dev-agency', 'saas-agency', 'design-agency', 'software-agency',
    'technologies', 'portfolio', 'creative-studio', 'digital-studio', 'innovate',
    'nexus-agency', 'apex-agency', 'vertex-agency', 'future-tech', 'digital-products'
  ];
  for (const item of list) {
    await checkSite(item);
  }
}
run();
