const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const targetFile = path.resolve(outDir, 'mobile_375_delayed.png');
const cmd = `"${edge}" --headless=new --disable-gpu --window-size=375,812 --virtual-time-budget=4000 --screenshot="${targetFile}" http://localhost:3000`;
execSync(cmd, { stdio: 'inherit' });
console.log('Saved:', targetFile, fs.statSync(targetFile).size);
