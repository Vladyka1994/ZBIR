#!/usr/bin/env node
// PreToolUse(Edit): блокує Edit, якщо файл не читали в цій сесії (Read або cat/head/tail/less через Bash).
// Обхід: фраза "read-bypass: ok" в останніх 5 текстах асистента. Будь-яка помилка → пропуск (fail-open).
'use strict';
const fs = require('fs');
let p; try { p = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
if (p.tool_name !== 'Edit') process.exit(0);
const fp = p.tool_input && p.tool_input.file_path;
if (!fp || !p.transcript_path || !fs.existsSync(p.transcript_path)) process.exit(0);
const cwd = p.cwd || process.cwd();
const targets = new Set([fp]);
if (fp.startsWith(cwd + '/')) { const rel = fp.slice(cwd.length + 1); targets.add(rel); targets.add('./' + rel); }
const base = fp.split('/').pop();
const readish = /(^|[\s|&;()])(cat|head|tail|less|more|bat|sed -n)\s/;
let found = false; const texts = [];
for (const line of fs.readFileSync(p.transcript_path, 'utf8').split('\n')) {
  let e; try { e = JSON.parse(line); } catch { continue; }
  if (e.type !== 'assistant' || !Array.isArray(e.message?.content)) continue;
  for (const b of e.message.content) {
    if (b?.type === 'text') texts.push(b.text || '');
    if (b?.type !== 'tool_use') continue;
    const i = b.input || {};
    if (b.name === 'Read' && targets.has(i.file_path)) found = true;
    if (b.name === 'Bash' && readish.test(i.command || '') &&
        ([...targets].some(t => i.command.includes(t)) || i.command.includes(base))) found = true;
  }
}
if (found || texts.slice(-5).some(t => t.toLowerCase().includes('read-bypass: ok'))) process.exit(0);
process.stderr.write(`Edit без попереднього Read. Спершу прочитай файл.\nФайл: ${fp}\nОбхід: напиши "read-bypass: ok".\n`);
process.exit(2);
