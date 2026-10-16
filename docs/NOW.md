# NOW — пульс ZBIR

<!-- AUTO:BEGIN — генерується scripts/now_update.mjs з git, руками не правити -->
гілка: claude/new-repo-skills-rules-6xfoaa · останній PR: — · не в main: розгортання кіта
<!-- AUTO:END -->

## 🎯 ЗАРАЗ
Новий репозиторій. Розгорнуто робоче середовище з `VOVA_CLAUDE_KIT.md` (правила, команди, хуки, скіли). Проєкт передано від Вови Владу (новачок — пояснювати просто). Старий прототип прочитано (`Volodymyr221/LikarskyTravy-Market`). Ціль — робочий сайт https://vladyka1994.github.io/ZBIR/.

## ✅ ЗРОБЛЕНО В ОСТАННІЙ СЕСІЇ (16.10.2026)
- `CLAUDE.md`, `docs/` (NOW, HOT_RULES, OWNER_PROFILE, NEVYKONANI_ZAVDANNIA, KURS, BUGS, SESSION_STATE, BYYOU_PLAN, MARKETING_PLAYBOOK).
- 21 команда в `.claude/commands/` + `fullaudit` в `commands-archived/`.
- Хуки + `.claude/settings.json`; скіли: caveman, vibe-audit, ui-ux-pro-max, 7 анімаційних (`.agents/skills/`, симлінки в `.claude/skills/`).
- Набір знеособлено: прибрано прив'язку до автора набору (ім'я, профіль, рід звертання, чужий проєкт).
- Додано сторонні скіли (дизайн, анімації, безпека).
- Оригінал кіта — `docs/_archive/VOVA_CLAUDE_KIT.md` (довідка, не обов'язкове читання).

## 🚧 НЕ ДОРОБЛЕНО
- Плейсхолдери `{{...}}` (стек, домен, аудиторія) — чекають ідеї й вибору стеку. `grep -rn "{{" .claude docs CLAUDE.md`
- `scripts/now_update.mjs` — ще не написаний (нема стеку).

## ❓ ВІДКРИТІ ПИТАННЯ ДО ВОВИ
- Переносимо старий прототип як основу чи будуємо з нуля?
- Профіль власника `docs/OWNER_PROFILE.md` — заповнити.

## ➡️ ДАЛІ
1. Влад обирає: основа зі старого прототипу чи з нуля.
2. 2–3 варіанти стеку з плюсами/мінусами + ASCII-макет головного екрана.
3. Після «Роби» — підставити плейсхолдери, створити каркас.

## 🛑 НЕ ЧІПАТИ
- `.claude/hooks/*` і формат рядка `**Статус:**` у `docs/BYYOU_PLAN.md` — хуки на нього зав'язані.
