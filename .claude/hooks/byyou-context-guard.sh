#!/bin/bash
# Stop: під час active /byyou при ≥75% контексту не дає тихо завершитись — спершу handoff у BYYOU_PLAN.md.
# 60% — одноразове попередження. stop_hook_active — захист від нескінченного циклу.
input=$(cat)
dir="$(dirname "$0")"
plan="${CLAUDE_PROJECT_DIR:-$dir/../..}/${DOCS_DIR:-docs}/BYYOU_PLAN.md"
[[ -f "$plan" ]] || exit 0
grep -qiE '^\*\*Статус:\*\*[[:space:]]*(🟢[[:space:]]*)?active' "$plan" || exit 0
read -r tp again < <(echo "$input" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('transcript_path') or '-', int(bool(d.get('stop_hook_active'))))" 2>/dev/null)
[[ "$again" == 1 ]] && exit 0          # уже блокували цей Stop — не зациклюємось
[[ -f "$tp" ]] || exit 0
read -r pct tok < <(bash "$dir/lib/compute-context-pct.sh" "$tp" 2>/dev/null) || exit 0
FLAG="$dir/.byyou-handoff-warned"
if (( pct >= 75 )); then
  echo "КОНТЕКСТ ${pct}% — /byyou ПОРА ЗУПИНИТИ: 1) дозаповни «Де зупинились»; 2) Статус: paused; 3) скажи власнику окремим повідомленням. Новий чат → /byyou." >&2
  exit 2
elif (( pct >= 60 )); then
  [[ -f "$FLAG" ]] || { touch "$FLAG"; echo "КОНТЕКСТ ${pct}% — до стопу 75%. Тримай «Де зупинились» актуальним щокроку." >&2; }
else
  rm -f "$FLAG"
fi
exit 0
