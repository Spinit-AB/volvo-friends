import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, '../locales');
const files = readdirSync(localesDir).filter(f => f.endsWith('.json'));



// Read all translations into memory
const translations = files.map(file => {
  const filePath = join(localesDir, file);
  const json = JSON.parse(readFileSync(filePath, 'utf8'));
  return { file, filePath, json };
});

// Use sv.json as the master
const masterFile = 'sv.json';
const master = translations.find(t => t.file === masterFile);
if (!master) {
  console.error(`\x1b[31m[ERROR]\x1b[0m Master file ${masterFile} not found!`);
  process.exit(1);
}
const masterKeys = new Set(Object.keys(master.json));

// Warn for missing or extra keys compared to master
translations.forEach(({ file, json }) => {
  if (file === masterFile) return; // skip master
  const keys = new Set(Object.keys(json));
  const missing = Array.from(masterKeys).filter(key => !keys.has(key));
  const extra = Array.from(keys).filter(key => !masterKeys.has(key));
  if (missing.length > 0) {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${file} is missing keys:`, missing);
  }
  if (extra.length > 0) {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${file} has extra keys:`, extra);
  }
});

// Sort and write back
translations.forEach(({ file, filePath, json }) => {
  const sorted = Object.keys(json)
    .sort()
    .reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {});
  writeFileSync(filePath, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`Sorted ${file}`);
});