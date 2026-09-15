const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('HTML Length:', data.length);
    const checks = [
      ['H1', 'We turn ideas into'],
      ['Services', 'One partner. Every'],
      ['Why Parthav', 'Not just a vendor'],
      ['Impact Metrics', '50+'],
      ['Work', 'FEATURED WORK'],
      ['Process', 'A clear process'],
      ['About', 'Built in Jaipur'],
      ['SEO & AI', 'discoverable'],
      ['Testimonials', 'What Our Clients Say'],
      ['FAQ', 'Got questions'],
      ['Contact', 'build something'],
      ['Final CTA', 'Ready to turn'],
      ['Footer', 'All rights reserved']
    ];
    for (const [name, str] of checks) {
      console.log(`[CHECK] ${name.padEnd(16)}: ${data.includes(str) ? 'FOUND' : 'MISSING'}`);
    }
  });
}).on('error', err => console.error('Error:', err.message));
