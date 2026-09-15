const http = require('http');

// Simple script to query edge CDP or fetch localhost:3000
const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const script = `
  const navContainer = document.querySelector('header .container');
  const logo = document.querySelector('header a img');
  const navRight = document.querySelector('header div[class*="navRight"]');
  const navCta = document.querySelector('header div[class*="navCta"]');
  const menuBtn = document.querySelector('header button[class*="menuButton"]');
  console.log(JSON.stringify({
    windowWidth: window.innerWidth,
    containerRect: navContainer ? navContainer.getBoundingClientRect() : null,
    logoRect: logo ? logo.getBoundingClientRect() : null,
    navRightRect: navRight ? navRight.getBoundingClientRect() : null,
    navCtaRect: navCta ? navCta.getBoundingClientRect() : null,
    menuBtnRect: menuBtn ? menuBtn.getBoundingClientRect() : null,
    menuBtnDisplay: menuBtn ? getComputedStyle(menuBtn).display : null,
    menuBtnVisibility: menuBtn ? getComputedStyle(menuBtn).visibility : null,
    menuBtnOpacity: menuBtn ? getComputedStyle(menuBtn).opacity : null,
  }));
`;

// Run Edge headless with remote debugging to inspect
const cmd = `"${edge}" --headless=new --disable-gpu --window-size=375,812 --dump-dom http://localhost:3000`;
try {
  const dom = execSync(cmd).toString();
  const hasMenuBtn = dom.includes('menuButton');
  const hasCta = dom.includes('headerCtaBtn') || dom.includes('navCta');
  console.log('DOM has menuButton:', hasMenuBtn, 'hasCta:', hasCta);
} catch (e) {
  console.error(e.message);
}
