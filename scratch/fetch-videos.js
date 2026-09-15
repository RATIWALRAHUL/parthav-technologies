async function getVideos(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    const matches = text.match(/https:\/\/[^"'\s\)]+\.mp4/g);
    console.log(url, matches ? [...new Set(matches)] : 'none');
  } catch(e) {
    console.log(url, e.message);
  }
}

async function run() {
  await getVideos('https://vizcom.com');
  await getVideos('https://exflow.site');
  await getVideos('https://sqlstudio.co');
}
run();
