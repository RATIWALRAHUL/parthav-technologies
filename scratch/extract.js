const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

try {
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/designpro.mp4 -vframes 1 scratch/video_test/designpro_thumb.jpg`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/datacore.mp4 -vframes 1 scratch/video_test/datacore_thumb.jpg`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i scratch/video_test/digital_epoch.mp4 -vframes 1 scratch/video_test/digital_epoch_thumb.jpg`, { stdio: 'inherit' });
  console.log('Done extracting frames');
} catch(e) {
  console.error(e);
}
