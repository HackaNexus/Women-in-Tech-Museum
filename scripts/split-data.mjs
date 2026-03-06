/**
 * Merge pioneers/*.json into a single pioneers.json (for backup/export).
 * Data source is pioneers/ folder; this script creates a combined file.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pioneersDir = join(root, 'src/data/pioneers');
const fields = JSON.parse(readFileSync(join(root, 'src/data/fields.json'), 'utf-8'));

// Field order for consistent merge
const fieldOrder = fields.map((f) => f.id);

const pioneers = [];
for (const fieldId of fieldOrder) {
  const fn = join(pioneersDir, `${fieldId}.json`);
  try {
    const list = JSON.parse(readFileSync(fn, 'utf-8'));
    pioneers.push(...list);
    console.log(`Read ${fieldId}.json (${list.length} pioneers)`);
  } catch (e) {
    console.warn(`Skip ${fieldId}.json: ${e.message}`);
  }
}

const outPath = join(root, 'src/data/pioneers.json');
writeFileSync(outPath, JSON.stringify(pioneers, null, 2) + '\n');
console.log(`\nMerged ${pioneers.length} pioneers → pioneers.json`);
