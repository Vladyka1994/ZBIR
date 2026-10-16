// Міні-блок «Ціни тижня» на головній — гачок, щоб збирачі заходили щотижня.
import Link from "next/link";
import { dryWord, herbs } from "@/data/herbs";
import { uah } from "@/lib/format";

const top = ["air-root", "chamomile", "rosehip", "linden"];

export function PricesStrip() {
  return (
    <section className="mx-auto mt-6 max-w-5xl px-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[19px] font-bold">Ціни тижня</h2>
        <Link href="/tsiny/" className="text-[14px] font-semibold text-accent">Усі ціни →</Link>
      </div>
      <div className="no-scrollbar -mx-4 mt-2 flex gap-3 overflow-x-auto px-4 pb-1">
        {top.map((id) => {
          const h = herbs.find((x) => x.id === id)!;
          return (
            <Link key={id} href="/tsiny/" className="pressable w-40 shrink-0 rounded-2xl border border-line bg-surface p-3 shadow-card">
              <p className="truncate text-[14px] text-muted">{h.name}</p>
              <p className="mt-1 text-[17px] font-bold">{h.priceHint[0]}–{uah(h.priceHint[1])}</p>
              <p className="text-[12px] text-muted">{dryWord(h)}, за 1 кг</p>
            </Link>
          );
        })}
      </div>
      <p className="mt-1 text-[12px] text-muted">Приклад цін — справжні оновимо, коли зберемо від закупівельників.</p>
    </section>
  );
}
