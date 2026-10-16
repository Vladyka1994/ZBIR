#!/usr/bin/env bash
# PostToolUse(Edit|Write): одразу перевіряє синтаксис зміненого файлу коду.
# Команди підлаштуй під стек (tsc / eslint / py_compile …). Exit 2 → Claude побачить помилку і виправить.
f=$(python3 -c "import sys,json;print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
case "$f" in
  *.js|*.mjs) out=$(node scripts/check-syntax.mjs "$f" 2>&1) ;;   # або eslint
  *.ts|*.tsx) out=$(npx tsc --noEmit --skipLibCheck "$f" 2>&1) ;;
  *.py)       out=$(python3 -m py_compile "$f" 2>&1) ;;
  *) exit 0 ;;
esac
[[ $? -eq 0 ]] && exit 0
echo "❌ Синтаксис: $f"$'\n'"$out" >&2
exit 2
