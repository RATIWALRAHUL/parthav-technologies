const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'video_test', 'digital_epoch.mp4');
const outMp4 = path.join(__dirname, '..', 'public', 'videos', 'hero-agency.mp4');
const outWebm = path.join(__dirname, '..', 'public', 'videos', 'hero-agency.webm');
const outPoster = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-agency-poster.webp');

// Ensure directories exist
fs.mkdirSync(path.dirname(outMp4), { recursive: true });
fs.mkdirSync(path.dirname(outPoster), { recursive: true });

console.log('Generating 30s looped hero-agency.mp4...');
// Stream loop 2 times to get ~30 seconds of high quality video
const cmdMp4 = `"${ffmpeg}" -stream_loop 2 -i "${input}" -t 30 -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -an -movflags +faststart "${outMp4}" -y`;
execSync(cmdMp4, { stdio: 'inherit' });

console.log('Generating hero-agency.webm...');
const cmdWebm = `"${ffmpeg}" -i "${outMp4}" -c:v libvpx-vp9 -b:v 0 -crf 32 -an "${outWebm}" -y`;
execSync(cmdWebm, { stdio: 'inherit' });

console.log('Generating poster webp...');
const cmdPoster = `"${ffmpeg}" -ss 00:00:02 -i "${outMp4}" -vframes 1 -q:v 80 "${outPoster}" -y`;
execSync(cmdPoster, { stdio: 'inherit' });

console.log('Done preparing hero-agency videos!');
console.log('MP4 size:', fs.statSync(outMp4).size);
console.log('WebM size:', fs.statSync(outWebm).size);
