// «Ціни тижня» — скільки зараз платять за кг сухої сировини.
import type { Metadata } from "next";
import { HerbArt } from "@/components/HerbArt";
import { dryWord, herbs } from "@/data/herbs";
import { uah } from "@/lib/format";

export const metadata: Metadata = { title: "Ціни тижня" };

export default function Prices() {
  const sorted = herbs.filter((h) => h.priceHint).sort((a, b) => a.name.localeCompare(b.name, "uk"));
  return (
    <div className="mx-auto max-w-2xl px-4 pt-5">
      <h1 className="text-[26px] font-bold">Ціни тижня</h1>
      <p className="mt-1 text-[15px] text-muted">Скільки зараз платять за 1 кг сухої сировини.</p>
      <p className="mt-3 rounded-xl bg-orange-soft px-3 py-2 text-[13px] text-orange">
        Поки це приклад. Справжні ціни з&apos;являться, коли зберемо їх від закупівельників.
      </p>
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {sorted.map((h) => (
          <li key={h.id} className="flex items-center gap-3 px-3 py-3">
            <HerbArt herbId={h.id} className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{h.name}</p>
              <p className="text-[13px] text-muted">{h.part}</p>
            </div>
            <p className="shrink-0 text-right font-bold">{h.priceHint![0]}–{uah(h.priceHint![1])}<span className="block text-[12px] font-normal text-muted">{dryWord(h)}, за 1 кг</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
