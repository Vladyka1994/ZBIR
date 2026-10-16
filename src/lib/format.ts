// Форматування чисел і цін для людей.
export const uah = (n: number) => `${n.toLocaleString("uk-UA")} грн`;
export const kg = (n: number) => (n >= 1000 ? `${(n / 1000).toLocaleString("uk-UA")} т` : `${n.toLocaleString("uk-UA")} кг`);

/** Одиниці ціни — як люди реально продають: за кг, за 100 г, за літр (ягоди), за штуку. */
export type Unit = "kg" | "100g" | "l" | "pc";
export const units: { id: Unit; label: string; short: string }[] = [
  { id: "kg", label: "за 1 кг", short: "кг" },
  { id: "100g", label: "за 100 г", short: "100 г" },
  { id: "l", label: "за 1 літр", short: "л" },
  { id: "pc", label: "за 1 шт", short: "шт" },
];
export const unitShort = (u: Unit) => units.find((x) => x.id === u)!.short;

/** Ціна для сортування: усе, що можна, — у грн за кг; «договірна» — в кінець. */
export const comparablePrice = (price: number | null, unit: Unit) =>
  price == null ? Number.POSITIVE_INFINITY : unit === "100g" ? price * 10 : price;
