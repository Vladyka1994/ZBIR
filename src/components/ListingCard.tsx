// Картка оголошення в стрічці: фото (поки ілюстрація), назва, ціна з одиницею, місце, 1–2 позначки, кнопка.
// Прайс-лист (кілька рослин) — перші 3 позиції з цінами + «ще N».
import Link from "next/link";
import { HerbArt } from "./HerbArt";
import { ContactButtons } from "./ContactButtons";
import { Icon } from "./Icon";
import type { Listing } from "@/data/listings";
import { isList, itemName, listingTitle, priceText, tradeText } from "@/lib/items";

export function ListingCard({ l }: { l: Listing }) {
  const buy = l.kind === "buy";
  const list = isList(l);
  const first = l.items[0];
  const tags = [l.delivery.np && "Нова пошта", l.trade !== "retail" && tradeText[l.trade], l.condition === "свіжа" && "Свіжа"].filter(Boolean).slice(0, 3) as string[];
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <Link href={`/ogoloshennia/${l.id}/`} className="block">
        <div className="relative">
          <HerbArt herbId={first.herbId} className="aspect-[16/9] w-full" />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[12px] font-semibold ${buy ? "bg-orange text-on-orange" : "bg-accent text-on-accent"}`}>
            {buy ? "Куплю" : "Продам"}
          </span>
        </div>
        <div className="px-4 pt-3">
          {list ? (
            <>
              <h3 className="text-[17px] font-semibold">{listingTitle(l)}</h3>
              <ul className="mt-1.5 space-y-1 text-[14px]">
                {l.items.slice(0, 3).map((i, k) => (
                  <li key={k} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate">{itemName(i)}</span>
                    <span className={`shrink-0 font-semibold ${buy ? "text-orange" : "text-accent"}`}>{priceText(i)}</span>
                  </li>
                ))}
              </ul>
              {l.items.length > 3 && <p className="mt-1 text-[13px] font-medium text-muted">+ ще {l.items.length - 3} — дивіться всі</p>}
            </>
          ) : (
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="min-w-0 truncate text-[17px] font-semibold">{listingTitle(l)}</h3>
              <p className={`shrink-0 text-[17px] font-bold ${buy ? "text-orange" : "text-accent"} ${first.price == null ? "text-[14px]" : ""}`}>
                {buy && first.price != null && <span className="text-[13px] font-medium">до </span>}{priceText(first)}
              </p>
            </div>
          )}
          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[14px] text-muted">
            {l.volume && <><Icon name="box" size={15} /> {l.volume} <span aria-hidden="true">·</span></>}
            <Icon name="pin" size={15} /> {l.place ?? `${l.region} обл.`}
          </p>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((t) => <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] font-medium text-muted">{t}</span>)}
            </div>
          )}
        </div>
      </Link>
      <div className="mt-auto px-4 pb-4 pt-3">
        <ContactButtons l={l} />
      </div>
    </article>
  );
}
