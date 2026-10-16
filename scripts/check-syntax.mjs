import { readFileSync } from 'fs'; import { transform } from 'esbuild';
const f = process.argv[2];
try { await transform(readFileSync(f, 'utf8'), { loader: f.endsWith('x') ? 'jsx' : 'js', format: 'esm' }); }
catch (e) { console.error(e.message); process.exit(1); }
