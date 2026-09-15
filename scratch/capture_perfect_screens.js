const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('next/dist/compiled/ws');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const devices = [
  { name: 'iphone_se_375', width: 375, height: 667, scale: 2 },
  { name: 'iphone_14_390', width: 390, height: 844, scale: 3 },
  { name: 'small_mobile_320', width: 320, height: 650, scale: 2 },
  { name: 'ipad_tablet_768', width: 768, height: 1024, scale: 2 },
  { name: 'desktop_1440', width: 1440, height: 900, scale: 1 },
];

async function run() {
  const proc = spawn(edge, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const list = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list.find(p => p.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise(r => ws.on('open', r));

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const handler = (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.id === id) {
          ws.off('message', handler);
          resolve(msg.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 3500)); // Wait for page load and framer motion

  for (const dev of devices) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: dev.width,
      height: dev.height,
      deviceScaleFactor: 1,
      mobile: dev.width < 1000
    });

    await new Promise(r => setTimeout(r, 800));

    // Check scroll widths
    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      })`,
      returnByValue: true
    });

    console.log(`Device: ${dev.name} | Viewport: ${dev.width}x${dev.height} | Result:`, evalRes.result.value);

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: dev.width, height: dev.height, scale: 1 }
    });

    const filePath = path.resolve(outDir, `${dev.name}.png`);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${filePath} (${fs.statSync(filePath).size} bytes)`);
  }

  ws.close();
  proc.kill();
  console.log('All screenshots completed successfully!');
}

run().catch(console.error);
