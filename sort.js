const fs = require('fs');

function sortLines(fileName) {
  const text = fs.readFileSync(fileName, "utf8");
  const websites = [...new Set(text.split("\n"))];
  const sorted = websites.sort();
  fs.writeFileSync(fileName, sorted.join("\n"));
  console.log(`Sorted ${fileName}`);
}

sortLines('source.txt');
sortLines('extra.txt');