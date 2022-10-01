import puppeteer from "puppeteer";

//These should really come from common.
const FRAME_WIDTH = 720;
const FRAME_HEIGHT = 450;

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({width:FRAME_WIDTH,height:FRAME_HEIGHT});
  let status = await page.goto('https://website-change-alert.vercel.app/');
  console.log(status.status());

  try {
    await page.waitForNavigation({timeout: 5000});
  }
  catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {}
    else {throw(e);}
  }

  const document = await page.evaluate(() => {
    return document.getElementsByTagName("html")[0].outerHTML;
  });

  console.log('Dimensions:', document);


  await browser.close();
})();