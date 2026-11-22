// Writes the chosen 177-character text to <output dir>/entry.txt, byte for byte.
// Node 22+, no dependencies, no build step.
const fs = require('node:fs');
const path = require('node:path');

const here = __dirname;
const sourcePath = path.join(here, 'CHOSEN.txt');
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || '/output';

const bytes = fs.readFileSync(sourcePath);
if (bytes.length === 0 || bytes[bytes.length - 1] !== 0x0a || bytes[bytes.length - 2] === 0x0a) {
  throw new Error('CHOSEN.txt must end with exactly one newline');
}
const text = bytes.toString('utf8');
const chars = text.endsWith('\n') ? text.slice(0, -1).length : text.length;

fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, 'entry.txt');
fs.writeFileSync(target, bytes);

process.stdout.write('wrote ' + target + ' (' + chars + ' characters)\n');
