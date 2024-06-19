const fs = require('fs');
const readline = require('readline');

// 入力ファイルと出力ファイルのパス
const inputFile = 'source.txt';
const extraFile = 'extra.txt';
const outputFile = 'blocklist.txt';

function generateUrls(base) {
  console.log(`Generating URL patterns for ${base}`)
  const domains = ['com', 'org'];
  let patterns = [];

  domains.forEach(domain => {
    patterns.push(`*://*.${base}.${domain}/*`);
    patterns.push(`*://www.${base}.${domain}/*`);
    patterns.push(`*://ja.${base}.${domain}/*`);
    patterns.push(`*://jp.${base}.${domain}/*`);
  });

  patterns.push(`*://*.${base}.jp/*`);
  patterns.push(`*://www.${base}.jp/*`);
  patterns.push(`*://*.${base}.co.jp/*`);
  patterns.push(`*://www.${base}.co.jp/*`);

  return patterns.join('\n');
}

function generateExtraUrls(line) {
  console.log(`Generating EXTRA URL patterns for ${line}`)
  let patterns = [];
  patterns.push(`*://*.${line}/*`);
  patterns.push(`*://www.${line}/*`);
  patterns.push(`*://ja.${line}/*`);
  patterns.push(`*://jp.${line}/*`);

  return patterns.join('\n');
}

// ファイル読み込みストリームと書き込みストリームを作成
const rlInput = readline.createInterface({
  input: fs.createReadStream(inputFile),
  terminal: false
});

const output = fs.createWriteStream(outputFile);

// 基本ドメインのURLパターンを生成して出力ファイルに書き込み
rlInput.on('line', (line) => {
  if (line.trim()) { // 空行をスキップ
    const urls = generateUrls(line.trim());
    output.write(urls + '\n');
  }
});

rlInput.on('close', () => {
  const rlExtra = readline.createInterface({
    input: fs.createReadStream(extraFile),
    terminal: false
  });

  // 追加ドメインのURLパターンを生成して出力ファイルに書き込み
  rlExtra.on('line', (line) => {
    if (line.trim()) { // 空行をスキップ
      const extraUrls = generateExtraUrls(line.trim());
      output.write(extraUrls + '\n');
    }
  });

  rlExtra.on('close', () => {
    console.log(`URLパターンが ${outputFile} に生成されました。`);
    output.end();
  });
});
