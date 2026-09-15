const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

for (let s = 1; s <= 10; s += 3) {
  execSync(`"${ffmpeg}" -y -ss 00:00:0${s} -i scratch/video_test/digital_epoch.mp4 -vframes 1 scratch/video_test/epoch_${s}.jpg`, {stdio: 'ignore'});
}
console.log('Frames extracted');
