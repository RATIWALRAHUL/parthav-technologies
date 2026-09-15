const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        f.close(() => resolve(fs.statSync(dest).size));
      });
    }).on('error', reject);
  });
}

async function run() {
  const base = 'https://raw.githubusercontent.com/pulkitxm/Claude-Directory/main/';
  const items = [
    { p: 'hero-sections/power-ai-hero/public/assets/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4', out: 'scratch/video_test/power_ai.mp4', thumb: 'scratch/video_test/power_ai_thumb.jpg' },
    { p: 'landing-pages/axion-studio-landing/public/assets/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4', out: 'scratch/video_test/axion.mp4', thumb: 'scratch/video_test/axion_thumb.jpg' }
  ];
  for (const item of items) {
    console.log('Downloading', item.out);
    await download(base + encodeURI(item.p), item.out);
    execSync(`"${ffmpeg}" -y -ss 00:00:03 -i ${item.out} -vframes 1 ${item.thumb}`, {stdio: 'ignore'});
    console.log(item.thumb, 'done');
  }
}
run().catch(console.error);
