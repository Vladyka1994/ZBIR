// Картка оголошення в стрічці: фото (поки ілюстрація), назва, ціна, обсяг, місце, кнопка.
import Link from "next/link";
import { HerbArt } from "./HerbArt";
import { CallButton } from "./CallButton";
import { Icon } from "./Icon";
import { herbById } from "@/data/herbs";
import type { Listing } from "@/data/listings";
import { kg, uah } from "@/lib/format";

export function ListingCard({ l }: { l: Listing }) {
  const herb = herbById(l.herbId);
  const buy = l.kind === "buy";
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <Link href={`/ogoloshennia/${l.id}/`} className="block">
        <div className="relative">
          <HerbArt herbId={l.herbId} className="aspect-[16/9] w-full" />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[12px] font-semibold ${buy ? "bg-orange text-on-orange" : "bg-accent text-on-accent"}`}>
            {buy ? "Куплю" : "Продам"}
          </span>
        </div>
        <div className="px-4 pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="min-w-0 truncate text-[17px] font-semibold">{buy ? `Куплю: ${herb.name.toLowerCase()}` : herb.name}</h3>
            <p className={`shrink-0 text-[17px] font-bold ${buy ? "text-orange" : "text-accent"}`}>
              {buy && <span className="text-[13px] font-medium">до </span>}{uah(l.price)}<span className="text-[13px] font-medium text-muted">/кг</span>
            </p>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-[14px] text-muted">
            <Icon name={buy ? "box" : "box"} size={15} /> {buy ? "Потрібно" : "Є"} {kg(l.volumeKg)}
            <span aria-hidden="true">·</span>
            <Icon name="pin" size={15} /> {l.region} обл.
          </p>
        </div>
      </Link>
      <div className="mt-auto px-4 pb-4 pt-3">
        <CallButton kind={l.kind} />
      </div>
    </article>
  );
}
