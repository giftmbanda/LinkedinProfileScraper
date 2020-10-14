const puppeteer = require("puppeteer");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");




const parseQuery = (str) => encodeURIComponent(str);
const waitUntil = (t) => { new Promise((r) => { setTimeout(r, t) }) };

const uriQuery =  `site:linkedin.com/in/ AND "johannesburg" AND "nodejs developer"`;
const googleUrl = `https://google.com/search?q=${parseQuery(uriQuery)}`

const configureBrowser = async (url) => {
  const browser = await puppeteer.launch({ headless: false }); // headless set to false
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", });
  await page.setViewport({ width: 1366, height: 663 });
  return { page, browser };
};

const scrapGoogle = async (url) => {
  let { page, browser } = await configureBrowser(url);
  await waitUntil(1500); // wait some time

  const linkedinUrls = await page.evaluate(() => {
    let linkResults = [];
    const listGroupResult = document.querySelectorAll(".g");
    for (let x = 0; x < listGroupResult.length; x++) {
      const aElem = listGroupResult[x].getElementsByTagName("a");
      for (let i = 0; i < aElem.length; i++) {
        linkResults.push(aElem[i].getAttribute("href"));
      }
    }; return linkResults;
  });

  await browser.close();
  console.log(linkedinUrls);
  return linkedinUrls; // Returning with the linked profile urls
};

// const scrapLinkedin = async (url) => {
//   let { page, browser } = await configureBrowser(url);
//   await waitUntil(1500); // wait some time

//   const linkedinProfile = await page.evaluate(() => {
//     let frameElem = document.querySelector(".display-flex.mt2");
//     let name = frameElem.querySelector('.pv-top-card--list.align-items-center>li').textContent.trim();
//     let headline = frameElem.querySelector('h2').textContent.trim();
//     let country = frameElem.querySelector('.pv-top-card--list.pv-top-card--list-bullet.mt1>li').textContent.trim();
//     return { name, country, headline };
//   });

//   await browser.close();
//   console.log(linkedinProfile);
//   return linkedinProfile; // Returning with the linked profile 
// }

scrapGoogle(googleUrl);
