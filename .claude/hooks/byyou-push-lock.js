#!/usr/bin/env node
// PreToolUse(Bash): поки BYYOU_PLAN.md має «**Статус:** active» — git push заблоковано,
// доки ЛЮДИНА не напише «деплой» в одному з останніх 2 своїх повідомлень. Fail-open.
const fs = require('fs'), path = require('path');
const ROOT = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..');
const PLAN = path.join(ROOT, process.env.DOCS_DIR || 'docs', 'BYYOU_PLAN.md');
const RELEASE_MARKER = path.join(ROOT, '.claude', '.byyou-release');
const WORD = /деплой|deploy/i, N = 2;
const active = () => { try { return /\*\*Статус:\*\*\s*(🟢\s*)?active\b/i.test(fs.readFileSync(PLAN, 'utf8')); } catch { return false; } };
function userTexts(tp) {
  if (!tp || !fs.existsSync(tp)) return '';
  const out = [], lines = fs.readFileSync(tp, 'utf8').split('\n').filter(Boolean);
  for (let i = lines.length - 1; i >= 0 && out.length < N; i--) {
    try {
      const e = JSON.parse(lines[i]); if (e.type !== 'user' || !e.message) continue;
      const c = e.message.content;
      const t = Array.isArray(c) ? c.filter(b => b.type === 'text').map(b => b.text).join('\n') : (typeof c === 'string' ? c : '');
      if (t) out.push(t);   // tool_result-повідомлення без тексту пропускаються
    } catch {}
  }
  return out.join('\n');
}
let s = ''; process.stdin.on('data', c => s += c).on('end', () => {
  try {
    const d = JSON.parse(s || '{}'), cmd = d.tool_input?.command || '';
    if (!/\bgit\s+push\b/.test(cmd) || !active()) process.exit(0);
    if (fs.existsSync(RELEASE_MARKER) || WORD.test(userTexts(d.transcript_path))) process.exit(0);
    console.error('=== BYYOU PUSH-ЗАМОК ===\nПотік /byyou активний: push = публікація. Покажи реліз-нотатки і чекай слово «деплой».');
    process.exit(2);
  } catch { process.exit(0); }
});
