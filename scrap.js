const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios").default;

const parseQuery = (str) => encodeURIComponent(str);

const fetchHtml = async (PAGE_URL) => {
    try {
        const { data } = await axios.get(`https://google.com/search?q=${parseQuery(PAGE_URL)}`);
        console.log(`https://google.com/search?q=${parseQuery(PAGE_URL)}`)
        return data;
    } catch {
        console.error(`ERROR: An error occurred while trying to fetch the URL: ${PAGE_URL}`);
    }
};

const scrap = async () => {
    const URL = `site:linkedin.com/in/ AND "johannesburg" AND "nodejs developer"`;
    const body = await fetchHtml(URL);
    const $ = cheerio.load(body);

    //code below doesnt worl
    const list = $('div[id="main"]')
    .find('div > div > a')
    .toArray()
    .map(element => $(element).attr('href'));

    //console.log(list);
};

scrap();