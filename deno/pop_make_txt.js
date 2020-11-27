import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const path = "../data/population/";
const fns = Array.from(Deno.readDirSync(path), (f) => path + f.name);
fns.sort();
const latest = fns[fns.length - 1];
console.log(latest);

const csv = CSV.decode(await Deno.readTextFile(latest));
for (let i = 1; i < csv.length; i++) {
  const line = csv[i];
  if (line[3] === "全年齢") {
    continue;
  }
  if (line[3] === "105歳以上") {
    line[3] = "105";
  }
  const male = parseInt(line[4]);
  const female = parseInt(line[5]);
  await Deno.writeTextFile("../txt/pop/" + line[3] + ".txt", (male + female) + "\r\n");
  await Deno.writeTextFile("../txt/pop/" + line[3] + "m.txt", male + "\r\n");
  await Deno.writeTextFile("../txt/pop/" + line[3] + "f.txt", female + "\r\n");
}
