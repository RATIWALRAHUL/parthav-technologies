const http = require('http');

http.get('http://localhost:3000', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', async () => {
    console.log('Homepage status:', res.statusCode);
    
    // Extract all script and link tags
    const scriptSrcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    const linkHrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
    
    const allUrls = [...new Set([...scriptSrcs, ...linkHrefs])];
    console.log(`Checking ${allUrls.length} bundle URLs...`);
    
    let failed = 0;
    for (const url of allUrls) {
      if (url.startsWith('http://') || url.startsWith('https://')) continue;
      const fullUrl = url.startsWith('/') ? url : '/' + url;
      await new Promise(resolve => {
        http.get(`http://localhost:3000${fullUrl}`, (bundleRes) => {
          if (bundleRes.statusCode !== 200) {
            console.error(`FAILED [${bundleRes.statusCode}]: ${fullUrl}`);
            failed++;
          }
          resolve();
        }).on('error', err => {
          console.error(`ERROR on ${fullUrl}:`, err.message);
          failed++;
          resolve();
        });
      });
    }
    
    if (failed === 0) {
      console.log(`ALL ${allUrls.length} SCRIPTS AND STYLES RETURNED 200 OK! ZERO ERRORS.`);
    } else {
      console.error(`${failed} requests failed!`);
    }
  });
}).on('error', err => console.error('Error fetching homepage:', err));
