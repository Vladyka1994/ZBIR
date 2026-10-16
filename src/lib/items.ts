// Тексти для оголошень: назва позиції, ціна з одиницею, заголовок, умови. Одне місце — щоб картка й сторінка не розходились.
import { herbById } from "@/data/herbs";
import type { Item, Listing } from "@/data/listings";
import { comparablePrice, uah, unitShort } from "./format";

export const itemName = (i: Item) => i.name?.trim() || herbById(i.herbId).name;

export const priceText = (i: Item) => (i.price == null ? "Ціна договірна" : `${uah(i.price)}/${unitShort(i.unit)}`);

/** 1 рослина · 2 рослини · 5 рослин */
export const plants = (n: number) => {
  const m10 = n % 10, m100 = n % 100;
  const w = m10 === 1 && m100 !== 11 ? "рослина" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "рослини" : "рослин";
  return `${n} ${w}`;
};

export const isList = (l: Listing) => l.items.length > 1;

export const listingTitle = (l: Listing) => {
  if (isList(l)) return l.kind === "buy" ? `Купую ${plants(l.items.length)}` : `Прайс: ${plants(l.items.length)}`;
  const name = itemName(l.items[0]);
  return l.kind === "buy" ? `Куплю: ${name.toLowerCase()}` : name;
};

export const minPrice = (l: Listing) => Math.min(...l.items.map((i) => comparablePrice(i.price, i.unit)));

export const tradeText = { retail: "Роздріб", opt: "Опт", both: "Опт і роздріб" } as const;

export const deliveryText = (d: Listing["delivery"]) =>
  [d.np && "Нова пошта", d.pickup && "Самовивіз"].filter(Boolean).join(", ") || "Домовимось";

export const whereText = (l: Listing) => [l.place, `${l.region} обл.`].filter(Boolean).join(", ");
