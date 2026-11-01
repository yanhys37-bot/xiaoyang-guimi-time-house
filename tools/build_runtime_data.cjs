const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const files = [
  'SITE_CONFIG',
  'P1_CONTENT',
  'P2_CONTENT',
  'P3_CONTENT',
  'P4_CONTENT',
  'P4_FORTUNE_CONTENT',
];

const data = Object.fromEntries(files.map((name) => [
  name,
  JSON.parse(fs.readFileSync(path.join(root, 'content', `${name}.json`), 'utf8')),
]));

const target = path.join(root, 'content', 'runtime-data.js');
fs.writeFileSync(target, `/* Generated from content/*.json by tools/build_runtime_data.cjs. */\nwindow.TimeHouseData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`Generated ${path.relative(root, target)} from ${files.length} source files.`);
