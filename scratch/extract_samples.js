const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const targets = [
  { file: 'agenlabs.mp4', time: '00:00:05' },
  { file: 'agenlabs.mp4', time: '00:00:18' },
  { file: 'productized_agency.mp4', time: '00:00:05' },
  { file: 'productized_agency.mp4', time: '00:00:18' },
  { file: 'kinetic_orange.mp4', time: '00:00:05' },
  { file: 'codenest.mp4', time: '00:00:05' },
];

targets.forEach((t, i) => {
  const outName = `scratch/video_test/sample_${i}_${path.basename(t.file, '.mp4')}_${t.time.replace(/:/g, '')}.jpg`;
  try {
    execSync(`"${ffmpeg}" -ss ${t.time} -i "scratch/video_test/${t.file}" -vframes 1 -q:v 2 "${outName}" -y`);
    console.log('Saved', outName);
  } catch (e) {
    console.error('Error', e.message);
  }
});
