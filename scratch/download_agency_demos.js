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
    { p: 'templates/premium/aceternity/productized-agency-template/demo.mp4', out: 'scratch/video_test/productized_agency.mp4', thumb: 'scratch/video_test/productized_agency_thumb.jpg' },
    { p: 'templates/premium/aceternity/agenlabs-agency-template/demo.mp4', out: 'scratch/video_test/agenlabs.mp4', thumb: 'scratch/video_test/agenlabs_thumb.jpg' },
    { p: 'hero-sections/codenest-hero/demo.mp4', out: 'scratch/video_test/codenest.mp4', thumb: 'scratch/video_test/codenest_thumb.jpg' },
    { p: 'templates/kinetic-orange-brutalist-agency/demo.mp4', out: 'scratch/video_test/kinetic_orange.mp4', thumb: 'scratch/video_test/kinetic_orange_thumb.jpg' }
  ];

  for (const item of items) {
    console.log('Downloading', item.out);
    await download(base + encodeURI(item.p), item.out);
    execSync(`"${ffmpeg}" -y -ss 00:00:02 -i ${item.out} -vframes 1 ${item.thumb}`, {stdio: 'ignore'});
    console.log(item.thumb, 'done');
  }
}
run().catch(console.error);
