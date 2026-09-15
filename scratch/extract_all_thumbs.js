const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'video_test');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

files.forEach(f => {
  const base = path.basename(f, '.mp4');
  const thumb = path.join(dir, `${base}_mid.jpg`);
  if (!fs.existsSync(thumb)) {
    try {
      execSync(`"${ffmpeg}" -ss 00:00:03 -i "${path.join(dir, f)}" -vframes 1 -q:v 2 "${thumb}" -y`, { stdio: 'ignore' });
      console.log('Extracted:', thumb);
    } catch (e) {}
  }
});
console.log('Done');
