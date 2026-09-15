const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'video_test');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

files.forEach(f => {
  try {
    const fullPath = path.join(dir, f);
    const cmd = `"${ffmpeg}" -i "${fullPath}"`;
    execSync(cmd, { stdio: 'pipe' });
  } catch (e) {
    const out = (e.stderr ? e.stderr.toString() : '') + (e.stdout ? e.stdout.toString() : '');
    const dur = out.match(/Duration: ([^,]+)/);
    const res = out.match(/, (\d{3,4}x\d{3,4})/);
    console.log(`${f.padEnd(26)} | Dur: ${dur ? dur[1] : 'N/A'} | Res: ${res ? res[1] : 'N/A'}`);
  }
});
