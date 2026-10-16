"use client";
// «Подати оголошення». Головне — зверху й коротко (рослина, ціна, область, телефон),
// решта — у «Додатково». Можна кілька рослин одразу (прайс-лист). Поки без бази: показуємо, що буде далі.
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { categories, herbs, OTHER } from "@/data/herbs";
import { regions } from "@/data/regions";
import { units, type Unit } from "@/lib/format";
import { BANNED_TEXT, bannedWord } from "@/lib/rules";

const field = "mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-3 text-[16px]";
const seg = (on: boolean, color = "text-accent") => `h-11 rounded-lg text-[15px] font-semibold ${on ? `bg-surface shadow-card ${color}` : "text-muted"}`;

type Row = { herbId: string; name: string; price: string; unit: Unit; deal: boolean };
const emptyRow = (): Row => ({ herbId: "", name: "", price: "", unit: "kg", deal: false });

function Check({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-xl border border-line bg-surface px-3 text-[15px]">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-[var(--accent)]" /> {label}
    </label>
  );
}

export default function Sell() {
  const [kind, setKind] = useState<"sell" | "buy">("sell");
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [condition, setCondition] = useState<"суха" | "свіжа">("суха");
  const [trade, setTrade] = useState<"retail" | "opt" | "both">("both");
  const [sent, setSent] = useState(false);
  const sell = kind === "sell";

  const setRow = (k: number, patch: Partial<Row>) => setRows((r) => r.map((x, i) => (i === k ? { ...x, ...patch } : x)));
  const banned = rows.map((r) => (r.herbId === OTHER ? bannedWord(r.name) : null));

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent"><Icon name="leaf" size={30} /></span>
        <h1 className="mt-4 text-[22px] font-bold">Майже готово!</h1>
        <p className="mt-2 text-[15px] text-muted">Це пробна версія — оголошення поки не зберігаються. Скоро тут можна буде подати справжнє оголошення.</p>
        <Link href="/" className="pressable mt-6 inline-flex h-12 items-center rounded-xl bg-accent px-6 font-semibold text-on-accent">На головну</Link>
      </div>
    );
  }

  return (
    <form className="mx-auto max-w-md px-4 pt-5" onSubmit={(e) => { e.preventDefault(); if (!banned.some(Boolean)) setSent(true); }}>
      <h1 className="text-[26px] font-bold">Подати оголошення</h1>
      <p className="mt-1 text-[15px] text-muted">Безкоштовно. Займе хвилину.</p>

      <div className="mt-4 grid grid-cols-2 rounded-xl bg-surface-2 p-1">
        <button type="button" onClick={() => setKind("sell")} aria-pressed={sell} className={seg(sell)}>Продаю</button>
        <button type="button" onClick={() => setKind("buy")} aria-pressed={!sell} className={seg(!sell, "text-orange")}>Куплю</button>
      </div>

      {sell && (
        <label className="mt-4 flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line bg-surface text-muted">
          <Icon name="camera" size={26} />
          <span className="text-[14px] font-medium">Додати фото сировини (до 5)</span>
          <span className="text-[12px]">З фото оголошення помічають утричі частіше</span>
          <input type="file" accept="image/*" multiple className="sr-only" />
        </label>
      )}

      <div className="mt-4 space-y-3">
        {rows.map((r, k) => (
          <fieldset key={k} className="rounded-2xl border border-line bg-surface p-3">
            <div className="flex items-center justify-between">
              <legend className="text-[14px] font-semibold">{rows.length > 1 ? `Рослина ${k + 1}` : `Що ${sell ? "продаєте" : "купуєте"}?`}</legend>
              {rows.length > 1 && (
                <button type="button" onClick={() => setRows((x) => x.filter((_, i) => i !== k))} aria-label={`Прибрати рослину ${k + 1}`}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-surface-2"><Icon name="x" size={18} /></button>
              )}
            </div>
            <select required value={r.herbId} onChange={(e) => setRow(k, { herbId: e.target.value })} className={field} aria-label="Рослина">
              <option value="" disabled>Оберіть рослину</option>
              {categories.map((c) => (
                <optgroup key={c.id} label={c.name}>
                  {herbs.filter((h) => h.category === c.id && h.id !== OTHER).map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
                </optgroup>
              ))}
              <option value={OTHER}>Інша рослина — напишу сам(а)</option>
            </select>
            {r.herbId === OTHER && (
              <>
                <input required value={r.name} onChange={(e) => setRow(k, { name: e.target.value })} placeholder="Назва рослини" className={field} aria-label="Назва рослини" />
                {banned[k] && <p role="alert" className="mt-1.5 text-[13px] font-medium text-orange">{BANNED_TEXT}</p>}
              </>
            )}
            <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
              <input type="number" inputMode="numeric" min={1} required={!r.deal} disabled={r.deal} value={r.price} onChange={(e) => setRow(k, { price: e.target.value })}
                placeholder={r.deal ? "Договірна" : "Ціна, грн"} aria-label="Ціна, грн" className={`${field} disabled:bg-surface-2`} />
              <select value={r.unit} onChange={(e) => setRow(k, { unit: e.target.value as Unit })} disabled={r.deal} aria-label="За яку кількість" className={`${field} w-32 disabled:bg-surface-2`}>
                {units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </div>
            <label className="mt-2 flex items-center gap-2 text-[14px]">
              <input type="checkbox" checked={r.deal} onChange={(e) => setRow(k, { deal: e.target.checked, price: "" })} className="h-5 w-5 accent-[var(--accent)]" /> Ціна договірна
            </label>
          </fieldset>
        ))}
        <button type="button" onClick={() => setRows((x) => [...x, emptyRow()])}
          className="pressable flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line font-semibold text-accent">
          <Icon name="plus" size={18} strokeWidth={2.4} /> Додати ще рослину
        </button>
      </div>

      <label className="mt-4 block text-[14px] font-medium">Область
        <select required className={field} defaultValue="">
          <option value="" disabled>Оберіть область</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label className="mt-3 block text-[14px] font-medium">Район або місто <span className="font-normal text-muted">(необов&apos;язково)</span>
        <input placeholder="Напр.: Ковельський р-н" className={field} />
      </label>

      <label className="mt-4 block text-[14px] font-medium">Ваш телефон
        <input required type="tel" inputMode="tel" placeholder="+380" className={field} />
      </label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Check label="Є Viber" defaultChecked />
        <Check label="Є Telegram" />
      </div>

      <details className="mt-4 rounded-2xl border border-line bg-surface p-3 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between text-[15px] font-semibold">
          Додатково <span className="text-[13px] font-normal text-muted">стан, доставка, опт…</span>
        </summary>
        <p className="mt-3 text-[14px] font-medium">Стан</p>
        <div className="mt-1.5 grid grid-cols-2 rounded-xl bg-surface-2 p-1">
          {(["суха", "свіжа"] as const).map((c) => <button key={c} type="button" onClick={() => setCondition(c)} aria-pressed={condition === c} className={seg(condition === c)}>{c === "суха" ? "Суха" : "Свіжа"}</button>)}
        </div>
        <p className="mt-3 text-[14px] font-medium">{sell ? "Продаю" : "Купую"}</p>
        <div className="mt-1.5 grid grid-cols-3 rounded-xl bg-surface-2 p-1">
          {([["retail", "Роздріб"], ["opt", "Опт"], ["both", "Обидва"]] as const).map(([v, t]) => <button key={v} type="button" onClick={() => setTrade(v)} aria-pressed={trade === v} className={seg(trade === v)}>{t}</button>)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block text-[14px] font-medium">Скільки є
            <input placeholder="50 кг" className={field} />
          </label>
          <label className="block text-[14px] font-medium">Рік збору
            <select className={field} defaultValue="2026">
              {["2026", "2025", "2024", "Раніше"].map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-3 text-[14px] font-medium">Доставка</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <Check label="Нова пошта" defaultChecked />
          <Check label="Самовивіз" defaultChecked />
        </div>
        <div className="mt-2"><Check label="Чисто, без домішок" /></div>
        <label className="mt-3 block text-[14px] font-medium">Опис
          <textarea rows={3} placeholder="Як сушили, де збирали, умови…" className="mt-1.5 w-full rounded-xl border border-line bg-surface p-3 text-[16px]" />
        </label>
      </details>

      <button type="submit" className={`pressable mt-6 h-13 w-full rounded-xl text-[16px] font-semibold ${sell ? "bg-accent text-on-accent" : "bg-orange text-on-orange"}`}>
        Опублікувати
      </button>
      <p className="mt-3 text-center text-[12px] text-muted">{BANNED_TEXT}</p>
    </form>
  );
}
