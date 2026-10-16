// Сторінка одного оголошення: ціна (або прайс-лист), контакти, умови, опис.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbArt } from "@/components/HerbArt";
import { ContactButtons } from "@/components/ContactButtons";
import { Icon } from "@/components/Icon";
import { listingById, listings } from "@/data/listings";
import { deliveryText, isList, itemName, listingTitle, priceText, tradeText, whereText } from "@/lib/items";

export const dynamicParams = false;
export const generateStaticParams = () => listings.map((l) => ({ id: l.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = listingById((await params).id);
  return { title: l ? `${l.kind === "buy" ? "Куплю" : "Продам"}: ${l.items.map(itemName).slice(0, 3).join(", ")}` : "Оголошення" };
}

export default async function ListingPage({ params }: Props) {
  const l = listingById((await params).id);
  if (!l) notFound();
  const buy = l.kind === "buy";
  const list = isList(l);
  const first = l.items[0];
  const facts: [string, string][] = [
    ...(l.volume ? [[buy ? "Потрібно" : "Є в наявності", l.volume] as [string, string]] : []),
    ["Стан", l.condition],
    ...(l.year ? [["Рік збору", String(l.year)] as [string, string]] : []),
    ...(l.clean ? [["Чистота", "Чисто, без домішок"] as [string, string]] : []),
    [buy ? "Купую" : "Продаю", tradeText[l.trade]],
    ["Доставка", deliveryText(l.delivery)],
    ["Де", whereText(l)],
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <HerbArt herbId={first.herbId} className="aspect-[4/3] w-full md:mt-4 md:rounded-3xl" />
        <Link href="/" aria-label="Назад" className="pressable absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-surface/90 shadow-card">
          <Icon name="back" size={20} strokeWidth={2.2} />
        </Link>
      </div>
      <div className="px-4 pt-4">
        <span className={`inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold ${buy ? "bg-orange-soft text-orange" : "bg-accent-soft text-accent"}`}>
          {buy ? "Куплю" : "Продам"}
        </span>
        <h1 className="mt-2 text-[24px] font-bold leading-tight">{listingTitle(l)}</h1>
        {!list && (
          <p className={`mt-1 text-[26px] font-bold ${buy ? "text-orange" : "text-accent"}`}>
            {buy && first.price != null && <span className="text-[16px] font-medium">до </span>}{priceText(first)}
          </p>
        )}
        {list && (
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
            {l.items.map((i, k) => (
              <li key={k} className="flex items-center gap-3 px-3 py-2.5">
                <HerbArt herbId={i.herbId} className="h-10 w-10 shrink-0 rounded-lg" />
                <span className="min-w-0 flex-1 truncate font-medium">{itemName(i)}</span>
                <span className={`shrink-0 font-bold ${buy ? "text-orange" : "text-accent"}`}>{priceText(i)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4"><ContactButtons l={l} full /></div>
        <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-3 text-[15px]">
              <dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-5 text-[17px] font-semibold">Опис</h2>
        <p className="mt-1 text-[15px] leading-relaxed">{l.note}</p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface-2 p-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-surface text-[17px] font-bold text-accent">{l.name[0]}</span>
          <div>
            <p className="font-semibold">{l.name}</p>
            <p className="text-[13px] text-muted">Оголошення додано {l.postedAgo}</p>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-muted">Лікарська сировина не замінює ліки. Перед застосуванням проконсультуйтесь з лікарем.</p>
      </div>
    </div>
  );
}
