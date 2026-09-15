const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// We can launch edge with remote debugging and evaluate expression
const script = `
  const d = {
    innerWidth: window.innerWidth,
    logo: document.querySelector('header a img') ? {
      w: document.querySelector('header a img').offsetWidth,
      h: document.querySelector('header a img').offsetHeight,
      rect: document.querySelector('header a img').getBoundingClientRect()
    } : null,
    navRight: document.querySelector('header div[class*=\"navRight\"]') ? {
      rect: document.querySelector('header div[class*=\"navRight\"]').getBoundingClientRect(),
      scrollWidth: document.querySelector('header div[class*=\"navRight\"]').scrollWidth
    } : null,
    cta: document.querySelector('header div[class*=\"navCta\"]') ? {
      rect: document.querySelector('header div[class*=\"navCta\"]').getBoundingClientRect()
    } : null,
    menu: document.querySelector('header button[class*=\"menuButton\"]') ? {
      rect: document.querySelector('header button[class*=\"menuButton\"]').getBoundingClientRect(),
      computed: getComputedStyle(document.querySelector('header button[class*=\"menuButton\"]')).display
    } : null,
    bodyScrollWidth: document.body.scrollWidth
  };
  console.log('MEASUREMENT:' + JSON.stringify(d));
`;

// Inject into page via an evaluation script
const cmd = `"${edge}" --headless=new --disable-gpu --window-size=375,812 --virtual-time-budget=3000 --run-all-compositor-stages-before-draw --dump-dom http://localhost:3000`;
try {
  // Let's create a test html that loads the site in an iframe or evaluate via node
} catch (e) {}
