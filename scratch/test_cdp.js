const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('next/dist/compiled/ws');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const proc = spawn(edge, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--window-size=453,900', // To get ~375 innerWidth!
  'http://localhost:3000'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      try {
        const list = JSON.parse(data);
        const page = list.find(p => p.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        ws.on('open', () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: `({
                innerWidth: window.innerWidth,
                bodyScrollWidth: document.body.scrollWidth,
                headerButtons: Array.from(document.querySelectorAll('header button, header a')).map(el => ({
                  tag: el.tagName,
                  className: el.className,
                  text: el.innerText.trim(),
                  rect: el.getBoundingClientRect()
                }))
              })`,
              returnByValue: true
            }
          }));
        });
        ws.on('message', (msg) => {
          const res = JSON.parse(msg.toString());
          if (res.id === 1) {
            console.log('RESULTS:', JSON.stringify(res.result.result.value, null, 2));
            ws.close();
            proc.kill();
          }
        });
      } catch (e) {
        proc.kill();
      }
    });
  }).on('error', e => {
    proc.kill();
  });
}, 2500);
