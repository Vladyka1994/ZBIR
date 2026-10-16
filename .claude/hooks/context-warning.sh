#!/usr/bin/env bash
# UserPromptSubmit: попередження, коли контекст заповнюється (замість «байти/3» з хардкод-шляхом).
input=$(cat)
dir="$(dirname "$0")"
tp=$(echo "$input" | python3 -c "import sys,json;print(json.load(sys.stdin).get('transcript_path') or '')" 2>/dev/null)
[[ -f "$tp" ]] || exit 0
read -r pct tok < <(bash "$dir/lib/compute-context-pct.sh" "$tp" 2>/dev/null) || exit 0
[[ -n "$pct" ]] || exit 0
if (( pct >= 90 )); then
  echo "{\"systemMessage\": \"🔴 КОНТЕКСТ ${pct}% (~$((tok/1000))K) — зроби /onovy зараз\"}"
elif (( pct >= 80 )); then
  echo "{\"systemMessage\": \"⚠️ КОНТЕКСТ ${pct}% — скоро /onovy\"}"
fi
exit 0
