// This script will help identify any console errors in the application
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Console Error: ${msg.text()}`);
    } else {
      console.log(`Console Log: ${msg.text()}`);
    }
  });

  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForTimeout(2000);
  
  // Close the browser
  await browser.close();
})();
