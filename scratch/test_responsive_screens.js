const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'mobile_320', width: 320, height: 750 },
  { name: 'mobile_375', width: 375, height: 812 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
];

viewports.forEach(vp => {
  const outFile = path.resolve(outDir, `${vp.name}.png`);
  const cmd = `"${edge}" --headless=new --disable-gpu --window-size=${vp.width},${vp.height} --virtual-time-budget=4000 --screenshot="${outFile}" http://localhost:3000`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Captured: ${vp.name} (${vp.width}x${vp.height}) -> ${fs.statSync(outFile).size} bytes`);
  } catch (e) {
    console.error(`Error on ${vp.name}:`, e.message);
  }
});
