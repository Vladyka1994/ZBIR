"use client";
// «Подати оголошення» — коротка форма на 30 секунд. Поки без бази: показуємо, що буде далі.
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { herbs } from "@/data/herbs";
import { regions } from "@/data/regions";

const field = "mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-3 text-[16px]";

export default function Sell() {
  const [kind, setKind] = useState<"sell" | "buy">("sell");
  const [sent, setSent] = useState(false);

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
    <form className="mx-auto max-w-md px-4 pt-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h1 className="text-[26px] font-bold">Подати оголошення</h1>
      <p className="mt-1 text-[15px] text-muted">Займе пів хвилини. Безкоштовно.</p>

      <div className="mt-4 grid grid-cols-2 rounded-xl bg-surface-2 p-1">
        {(["sell", "buy"] as const).map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} aria-pressed={kind === k}
            className={`h-10 rounded-lg text-[15px] font-semibold ${kind === k ? "bg-surface shadow-card " + (k === "sell" ? "text-accent" : "text-orange") : "text-muted"}`}>
            {k === "sell" ? "Продаю" : "Куплю"}
          </button>
        ))}
      </div>

      {kind === "sell" && (
        <label className="mt-4 flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line bg-surface text-muted">
          <Icon name="camera" size={26} />
          <span className="text-[14px] font-medium">Додати фото сировини</span>
          <input type="file" accept="image/*" className="sr-only" />
        </label>
      )}

      <label className="mt-4 block text-[14px] font-medium">Що {kind === "sell" ? "продаєте" : "купуєте"}?
        <select required className={field} defaultValue="">
          <option value="" disabled>Оберіть рослину</option>
          {herbs.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
        </select>
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block text-[14px] font-medium">Скільки, кг
          <input required type="number" inputMode="numeric" min={1} placeholder="50" className={field} />
        </label>
        <label className="block text-[14px] font-medium">Ціна за кг, грн
          <input required type="number" inputMode="numeric" min={1} placeholder="70" className={field} />
        </label>
      </div>
      <label className="mt-4 block text-[14px] font-medium">Область
        <select required className={field} defaultValue="">
          <option value="" disabled>Оберіть область</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label className="mt-4 block text-[14px] font-medium">Ваш телефон
        <input required type="tel" inputMode="tel" placeholder="+380" className={field} />
      </label>
      <button type="submit" className={`pressable mt-6 h-13 w-full rounded-xl text-[16px] font-semibold ${kind === "sell" ? "bg-accent text-on-accent" : "bg-orange text-on-orange"}`}>
        Опублікувати
      </button>
    </form>
  );
}
