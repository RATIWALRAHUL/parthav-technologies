const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

execSync(`"${ffmpeg}" -ss 00:00:02 -i public/videos/hero-agency.mp4 -vframes 1 -q:v 80 public/images/hero/hero-agency-poster.webp -y`, { stdio: 'inherit' });
console.log('Poster generated successfully');
