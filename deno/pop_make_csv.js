import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const path = "../data/population/";
const fns = Array.from(Deno.readDirSync(path), (f) => path + f.name);
fns.sort();
console.log(fns);

const all = [["year", "month", "age", "male", "female"]];
for (const fn of fns) {
  const csv = CSV.decode(await Deno.readTextFile(fn));
  for (let i = 1; i < csv.length; i++) {
    const line = csv[i];
    if (line[3] === "全年齢") {
      continue;
    }
    if (line[3] === "105歳以上") {
      line[3] = "105";
    }
    const d = [line[0], line[2], line[3], line[4], line[5]];
    all.push(d);
  }
  console.log(fn);
}
console.log(all);
await Deno.writeTextFile("../csv/population.csv", CSV.encode(all));
