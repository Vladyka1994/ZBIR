#!/usr/bin/env bash
# SessionStart: git fetch + голосне попередження, якщо локальні рефи відстають від origin.
# Навіщо: контейнер може відновитись на застарілий знімок — задеплоєна робота «зникає».
set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
command -v git >/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

if ! timeout 20 git fetch origin --quiet 2>/dev/null; then
  echo "⚠️ GIT-СИНК: git fetch не вдався (мережа?). Рефи можуть бути застарілі — git fetch origin вручну."
  exit 0
fi
warn=""
if git rev-parse -q --verify origin/main >/dev/null && git rev-parse -q --verify main >/dev/null; then
  b=$(git rev-list --count main..origin/main 2>/dev/null || echo 0)
  [ "${b:-0}" -gt 0 ] && warn+=$'\n'"⚠️ Локальний main ВІДСТАЄ від origin/main на $b комітів (origin = джерело правди)."
fi
cur=$(git branch --show-current 2>/dev/null || true)
if [ -n "$cur" ] && [ "$cur" != main ] && git rev-parse -q --verify "origin/$cur" >/dev/null; then
  c=$(git rev-list --count "$cur..origin/$cur" 2>/dev/null || echo 0)
  [ "${c:-0}" -gt 0 ] && warn+=$'\n'"⚠️ Гілка '$cur' відстає від origin/$cur на $c комітів."
fi
if [ -n "$warn" ]; then
  printf '🔄 GIT-СИНК: fetch виконано.%s\n➡️ «Щось зникло» — СПЕРШУ git fetch, потім висновки.\n' "$warn"
else
  echo "🔄 GIT-синк: локальний git синхронний з origin."
fi
exit 0
