const fs = require('fs');

async function search() {
  const queries = [
    'artificial intelligence network animation',
    'digital technology globe',
    'coding computer software',
    'developer laptop typing',
    'modern office technology',
    'internet network data visualization'
  ];
  
  for (const q of queries) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(q + ' filetype:video') + '&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|mime|metadata|thumburl&iiurlwidth=400&format=json';
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'AgencyBot/1.0' } });
      const data = await res.json();
      if (data.query && data.query.pages) {
        for (const p of Object.values(data.query.pages)) {
          const info = p.imageinfo && p.imageinfo[0];
          if (!info) continue;
          const dMeta = info.metadata && info.metadata.find(m => m.name === 'length' || m.name === 'duration');
          const dur = dMeta ? parseFloat(dMeta.value) : 0;
          if (info.mime && (info.mime.includes('webm') || info.mime.includes('mp4'))) {
            console.log(JSON.stringify({
              query: q,
              title: p.title,
              duration: dur,
              size: info.size,
              mime: info.mime,
              url: info.url,
              thumb: info.thumburl
            }));
          }
        }
      }
    } catch(e) {
      console.error(e.message);
    }
  }
}
search();
