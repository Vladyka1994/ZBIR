"use client";
// Стрічка оголошень: пошук, категорії, вкладки Продам/Куплю, фільтр (область + сортування).
import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ListingCard } from "./ListingCard";
import { SearchBox } from "./SearchBox";
import { categories, herbById, type CategoryId } from "@/data/herbs";
import { listings } from "@/data/listings";
import { regions } from "@/data/regions";
import { matchHerbs, norm } from "@/lib/search";

type Sort = "new" | "cheap" | "expensive";

export function Feed() {
  const [kind, setKind] = useState<"sell" | "buy">("sell");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryId | null>(null);
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState<Sort>("new");
  const [sheet, setSheet] = useState(false);

  const shown = useMemo(() => {
    const needle = norm(q);
    const herbIds = new Set(matchHerbs(q).map((h) => h.id));
    const out = listings.filter((l) => {
      const herb = herbById(l.herbId);
      return l.kind === kind
        && (!cat || herb.category === cat)
        && (!region || l.region === region)
        && (!needle || herbIds.has(l.herbId) || norm(l.note).includes(needle));
    });
    if (sort === "cheap") out.sort((a, b) => a.price - b.price);
    if (sort === "expensive") out.sort((a, b) => b.price - a.price);
    return out;
  }, [kind, q, cat, region, sort]);

  const filtersOn = (region ? 1 : 0) + (sort !== "new" ? 1 : 0);
  const reset = () => { setQ(""); setCat(null); setRegion(""); setSort("new"); };

  return (
    <section className="mx-auto max-w-5xl px-4">
      <SearchBox value={q} onChange={setQ} />

      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
        {categories.map((c) => {
          const on = cat === c.id;
          return (
            <button key={c.id} type="button" onClick={() => setCat(on ? null : c.id)} aria-pressed={on}
              className={`pressable h-9 shrink-0 rounded-full border px-4 text-[14px] font-medium ${on ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-ink"}`}>
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="grid flex-1 grid-cols-2 rounded-xl bg-surface-2 p-1" role="tablist">
          {(["sell", "buy"] as const).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)}
              className={`h-10 rounded-lg text-[15px] font-semibold ${kind === k ? (k === "sell" ? "bg-surface text-accent shadow-card" : "bg-surface text-orange shadow-card") : "text-muted"}`}>
              {k === "sell" ? "Продам" : "Куплю"}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setSheet(true)} aria-label="Фільтри"
          className="pressable relative grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface">
          <Icon name="filter" size={20} />
          {filtersOn > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-on-accent">{filtersOn}</span>}
        </button>
      </div>

      <p className="mt-4 text-[14px] text-muted">
        {kind === "sell" ? "Пропозиції збирачів" : "Заявки закупівельників"}: {shown.length}
      </p>

      {shown.length ? (
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface p-6 text-center">
          <p className="text-[16px] font-semibold">Нічого не знайшли</p>
          <p className="mt-1 text-[14px] text-muted">Спробуйте іншу назву або приберіть фільтри.</p>
          <button type="button" onClick={reset} className="pressable mt-4 h-11 rounded-xl bg-accent px-5 font-semibold text-on-accent">Показати все</button>
        </div>
      )}

      {sheet && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Фільтри">
          <button type="button" aria-label="Закрити" onClick={() => setSheet(false)} className="absolute inset-0 bg-black/35" />
          <div className="sheet-up safe-bottom absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-3xl bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[19px] font-bold">Фільтри</h2>
              <button type="button" onClick={() => setSheet(false)} aria-label="Закрити" className="grid h-10 w-10 place-items-center rounded-full bg-surface-2"><Icon name="x" size={18} /></button>
            </div>
            <label className="mt-4 block text-[14px] font-medium">Область
              <select value={region} onChange={(e) => setRegion(e.target.value)}
                className="mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-3 text-[16px]">
                <option value="">Уся Україна</option>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <p className="mt-4 text-[14px] font-medium">Спершу показувати</p>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {([["new", "Нові"], ["cheap", "Дешевші"], ["expensive", "Дорожчі"]] as const).map(([v, t]) => (
                <button key={v} type="button" onClick={() => setSort(v)} aria-pressed={sort === v}
                  className={`h-11 rounded-xl border text-[14px] font-medium ${sort === v ? "border-accent bg-accent-soft text-accent" : "border-line"}`}>{t}</button>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setRegion(""); setSort("new"); }} className="h-12 rounded-xl border border-line font-semibold">Скинути</button>
              <button type="button" onClick={() => setSheet(false)} className="h-12 rounded-xl bg-accent font-semibold text-on-accent">Показати {shown.length}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
