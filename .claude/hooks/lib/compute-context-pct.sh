#!/bin/bash
# stdout: "<percent> <tokens>" — реальний % контексту з usage останньої відповіді асистента.
t="${1:-}"; [[ -f "$t" ]] || exit 1
LIMIT="${CONTEXT_LIMIT:-200000}"
tokens=$(python3 - "$t" <<'PY'
import json,sys
last=None
for line in open(sys.argv[1],encoding='utf-8'):
    try: m=json.loads(line).get('message')
    except Exception: continue
    if isinstance(m,dict) and m.get('role')=='assistant' and isinstance(m.get('usage'),dict): last=m['usage']
if not last: sys.exit(1)
print((last.get('input_tokens') or 0)+(last.get('cache_read_input_tokens') or 0)+(last.get('cache_creation_input_tokens') or 0))
PY
) || exit 1
case "$tokens" in ''|*[!0-9]*) exit 1;; esac
[[ "$tokens" -gt 0 ]] || exit 1
echo "$(( tokens * 100 / LIMIT )) $tokens"
