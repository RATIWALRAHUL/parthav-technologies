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
  const url = 'https://raw.githubusercontent.com/pulkitxm/Claude-Directory/main/hero-sections/vanguard-hero-landing/public/assets/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4';
  const dest = 'scratch/video_test/vanguard.mp4';
  console.log('Downloading vanguard...');
  await download(url, dest);
  execSync(`"${ffmpeg}" -y -ss 00:00:03 -i ${dest} -vframes 1 scratch/video_test/vanguard_thumb.jpg`, {stdio: 'ignore'});
  console.log('vanguard thumb done');
}
run().catch(console.error);
