// Розумний пошук рослин: розуміє помилки («ромащка»), апострофи («мята»), народні назви («лепеха»)
// і категорії («коріння» → усе коріння). Одне місце правди для підказок і фільтра стрічки.
import { herbs, OTHER, type CategoryId, type Herb } from "@/data/herbs";

/** Слова, якими люди називають частину рослини — знаходять усю категорію. */
const categoryWords: Record<CategoryId, string[]> = {
  root: ["коріння", "корінь", "корені", "корінці"],
  leaf: ["листя", "лист", "листок"],
  flower: ["квіти", "квітки", "квітка", "цвіт"],
  fruit: ["плоди", "плід", "ягоди", "ягода"],
  herb: ["трава", "трави"],
  seed: ["насіння"],
  bark: ["кора", "бруньки"],
};

/** Малі літери, без апострофів (м'ята = мята), ґ → г, зайві пробіли геть. */
export const norm = (s: string) =>
  s.toLowerCase().replace(/['’ʼ‘`]/g, "").replace(/ґ/g, "г").replace(/[^a-zа-яіїєё0-9\s-]/g, " ").replace(/\s+/g, " ").trim();

/** Відстань Дамерау–Левенштейна: скільки літер треба змінити/додати/прибрати/переставити. */
function dist(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

/** Наскільки слово запиту q схоже на слово t: 0 — не схоже, більше — краще. */
function wordScore(q: string, t: string) {
  if (t === q) return 5;
  if (t.startsWith(q)) return 4;
  if (t.length >= 3 && q.startsWith(t)) return 3; // слово з закінченням: «аира» → «аир», «кропиви» → «кропив…»
  const allowed = q.length >= 8 ? 2 : q.length >= 5 ? 1 : 0; // короткі слова — без «вгадування» (інакше «кава» → «лаванда»)
  if (!allowed) return 0;
  const best = Math.min(dist(q, t), dist(q, t.slice(0, q.length)), dist(q, t.slice(0, q.length + 1)));
  return best <= allowed ? 3 - best : 0;
}

const terms = (h: Herb) => [h.name, h.part, ...h.aliases, ...categoryWords[h.category]].map((t) => norm(t).split(" "));

const index = herbs.filter((h) => h.id !== OTHER).map((h) => ({ herb: h, terms: terms(h) }));

/** Рослини, що підходять під запит, від найкращої. Кожне слово запиту має щось знайти. */
export function matchHerbs(query: string): Herb[] {
  const qs = norm(query).split(" ").filter(Boolean);
  if (!qs.length) return [];
  return index
    .map(({ herb, terms }) => {
      let total = 0;
      for (const q of qs) {
        const s = Math.max(0, ...terms.flat().map((t) => wordScore(q, t)));
        if (!s) return { herb, total: 0 };
        total += s;
      }
      // назва, що починається із запиту, — вище
      if (norm(herb.name).startsWith(norm(query))) total += 2;
      return { herb, total };
    })
    .filter((x) => x.total > 0)
    .sort((a, b) => b.total - a.total || a.herb.name.localeCompare(b.herb.name, "uk"))
    .map((x) => x.herb);
}

/** Популярні — показуємо, коли рядок пошуку порожній. */
export const popular = ["chamomile", "mint", "air-root", "rosehip", "linden", "nettle-leaf"];
