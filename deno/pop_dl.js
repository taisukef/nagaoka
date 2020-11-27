import cheerio from "https://dev.jspm.io/cheerio";
import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const url = "https://www.city.nagaoka.niigata.jp/shisei/cate10/jinkou/02.html";
const html = await (await fetch(url)).text();
const dom = cheerio.load(html);
const links = Array.from(dom("a"), (a) => a.attribs.href);

const baseurl = "https://www.city.nagaoka.niigata.jp/shisei/cate10/jinkou/";
const csvlinks = links.filter((fn) => fn.endsWith("u.csv")).map((fn) => baseurl + fn.substring(2));
console.log(csvlinks);

csvlinks.forEach(async (url) => {
  const csv = await CSV.fetch(url);
  const fn = "../data/population" + url.substring(url.lastIndexOf("/") + 1);
  console.log(fn);
  await Deno.writeTextFile(fn, CSV.encode(csv));
});
