#!/bin/bash
# PostToolUse(Edit|Write): нагадує підняти маркер версії, якщо змінено файл, що йде на прод.
f=$(python3 -c "import sys,json;print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
[[ -z "$f" ]] && exit 0
case "$f" in */.claude/*|*.md) exit 0 ;; esac
case "$f" in */src/*|*.css|*/index.html|*/sw.js) echo "🔄 Змінено $f — перед /finish підніми {{VERSION_BUMP}} (час: $(date +%Y%m%d-%H%M))." ;; esac
exit 0
