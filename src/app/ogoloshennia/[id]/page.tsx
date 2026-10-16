// Сторінка одного оголошення.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbArt } from "@/components/HerbArt";
import { CallButton } from "@/components/CallButton";
import { Icon } from "@/components/Icon";
import { herbById } from "@/data/herbs";
import { listingById, listings } from "@/data/listings";
import { kg, uah } from "@/lib/format";

export const dynamicParams = false;
export const generateStaticParams = () => listings.map((l) => ({ id: l.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = listingById((await params).id);
  if (!l) return { title: "Оголошення" };
  const herb = herbById(l.herbId);
  return { title: `${l.kind === "buy" ? "Куплю" : "Продам"}: ${herb.name} — ${l.price} грн/кг` };
}

export default async function ListingPage({ params }: Props) {
  const l = listingById((await params).id);
  if (!l) notFound();
  const herb = herbById(l.herbId);
  const buy = l.kind === "buy";
  const facts: [string, string][] = [
    [buy ? "Потрібно" : "Є в наявності", kg(l.volumeKg)],
    ["Стан", l.condition],
    ["Рік збору", String(l.year)],
    ["Частина рослини", herb.part],
    ["Де", `${l.place}, ${l.region} обл.`],
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <HerbArt herbId={l.herbId} className="aspect-[4/3] w-full md:mt-4 md:rounded-3xl" />
        <Link href="/" aria-label="Назад" className="pressable absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-surface/90 shadow-card">
          <Icon name="back" size={20} strokeWidth={2.2} />
        </Link>
      </div>
      <div className="px-4 pt-4">
        <span className={`inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold ${buy ? "bg-orange-soft text-orange" : "bg-accent-soft text-accent"}`}>
          {buy ? "Куплю" : "Продам"}
        </span>
        <h1 className="mt-2 text-[24px] font-bold leading-tight">{herb.name}</h1>
        <p className={`mt-1 text-[26px] font-bold ${buy ? "text-orange" : "text-accent"}`}>
          {buy && <span className="text-[16px] font-medium">до </span>}{uah(l.price)}<span className="text-[16px] font-medium text-muted"> / кг</span>
        </p>
        <div className="mt-4"><CallButton kind={l.kind} big /></div>
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
