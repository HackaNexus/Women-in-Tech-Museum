import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pioneers = JSON.parse(readFileSync(join(root, 'src/data/pioneers.json'), 'utf-8'));

const fixes = {
  'patricia-bath': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Patriciabath.jpg',
  'sylvia-earle': 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dr._Sylvia_Earle%2C_Construction_Worker%3F_%286666200905%29_%28cropped%29.jpg',
  'jane-goodall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jane_Goodall_2015.jpg/440px-Jane_Goodall_2015.jpg',
  'tu-youyou': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/D810_4987_Tu_Youyou%2C_medicine_%2822945001843%29_%28cropped%29.jpg',
  'emmanuelle-charpentier': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Emmanuelle_Charpentier.jpg',
  'liu-yang': 'https://upload.wikimedia.org/wikipedia/commons/1/16/Liu_Yang%28cropped%29.jpg',
};

let fixed = 0;
for (const p of pioneers) {
  if (fixes[p.slug]) {
    p.image = fixes[p.slug];
    fixed++;
    console.log(`Fixed: ${p.slug}`);
  }
}

writeFileSync(join(root, 'src/data/pioneers.json'), JSON.stringify(pioneers, null, 2) + '\n');
console.log(`\nFixed ${fixed} image URLs`);

// Re-split by field
const byField = {};
for (const p of pioneers) {
  if (!byField[p.field]) byField[p.field] = [];
  byField[p.field].push(p);
}
const outDir = join(root, 'src/data/pioneers');
mkdirSync(outDir, { recursive: true });
for (const [fieldId, list] of Object.entries(byField)) {
  writeFileSync(join(outDir, `${fieldId}.json`), JSON.stringify(list, null, 2) + '\n');
}
console.log('Re-split field files');
