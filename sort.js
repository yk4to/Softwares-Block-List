const fs = require('fs');
const text = fs.readFileSync("blocklist.txt", "utf8");
const websites = text.split("\n");
const sorted = websites.sort();
console.log("Sorted");
fs.writeFileSync("blocklist.txt", sorted.join("\n"));