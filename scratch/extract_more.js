const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

try {
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/synergeus.mp4 -vframes 1 scratch/video_test/synergeus_thumb.jpg`, {stdio: 'ignore'});
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/groundai.mp4 -vframes 1 scratch/video_test/groundai_thumb.jpg`, {stdio: 'ignore'});
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/final-walk.mp4 -vframes 1 scratch/video_test/final_walk_thumb.jpg`, {stdio: 'ignore'});
  console.log('Thumbs extracted');
} catch(e) {
  console.error(e);
}
