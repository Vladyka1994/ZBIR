// Приклади оголошень (пробна версія, без бази). Імена вигадані.
export type Listing = {
  id: string;
  kind: "sell" | "buy"; // Продам / Куплю
  herbId: string;
  price: number; // грн за кг; для «Куплю» — «до»
  volumeKg: number;
  region: string;
  place: string;
  condition: "сушена" | "свіжа";
  year: number;
  note: string;
  name: string;
  postedAgo: string;
};

export const listings: Listing[] = [
  { id: "s1", kind: "sell", herbId: "chamomile", price: 75, volumeKg: 50, region: "Волинська", place: "с. Струмівка", condition: "сушена", year: 2026, note: "Якісна, добре висушена ромашка. Без домішок, зберігаю в сухому.", name: "Олена", postedAgo: "сьогодні" },
  { id: "s2", kind: "sell", herbId: "air-root", price: 90, volumeKg: 100, region: "Львівська", place: "м. Дрогобич", condition: "сушена", year: 2026, note: "Корінь аїру, чистий, порізаний. Можу відправити Новою поштою.", name: "Іван", postedAgo: "сьогодні" },
  { id: "s3", kind: "sell", herbId: "mint", price: 70, volumeKg: 200, region: "Тернопільська", place: "м. Тернопіль", condition: "сушена", year: 2026, note: "Ароматна м'ята з власної ділянки. Підходить для чаю та зборів.", name: "Марія", postedAgo: "вчора" },
  { id: "s4", kind: "sell", herbId: "rosehip", price: 60, volumeKg: 150, region: "Рівненська", place: "м. Сарни", condition: "сушена", year: 2026, note: "Сухі, чисті плоди шипшини. Без гнилі.", name: "Петро", postedAgo: "вчора" },
  { id: "s5", kind: "sell", herbId: "linden", price: 180, volumeKg: 30, region: "Житомирська", place: "с. Городниця", condition: "сушена", year: 2026, note: "Липовий цвіт з приквітками, зібраний у червні далеко від доріг.", name: "Галина", postedAgo: "2 дні тому" },
  { id: "s6", kind: "sell", herbId: "nettle-leaf", price: 35, volumeKg: 300, region: "Чернігівська", place: "с. Мена", condition: "сушена", year: 2026, note: "Листя кропиви, сушене в тіні. Великий обсяг.", name: "Василь", postedAgo: "3 дні тому" },
  { id: "s7", kind: "sell", herbId: "hypericum", price: 50, volumeKg: 80, region: "Закарпатська", place: "с. Колочава", condition: "сушена", year: 2026, note: "Звіробій гірський, верхівки з квітами.", name: "Михайло", postedAgo: "тиждень тому" },
  { id: "s8", kind: "sell", herbId: "dandelion-root", price: 75, volumeKg: 60, region: "Полтавська", place: "м. Лубни", condition: "сушена", year: 2026, note: "Корінь кульбаби, митий, порізаний.", name: "Наталія", postedAgo: "тиждень тому" },
  { id: "b1", kind: "buy", herbId: "air-root", price: 85, volumeKg: 5000, region: "Волинська", place: "м. Луцьк", condition: "сушена", year: 2026, note: "Купуємо корінь аїру великими партіями. Забираємо самі від 100 кг. Оплата одразу.", name: "Заготівельна фірма", postedAgo: "сьогодні" },
  { id: "b2", kind: "buy", herbId: "chamomile", price: 70, volumeKg: 1000, region: "Київська", place: "м. Біла Церква", condition: "сушена", year: 2026, note: "Потрібна ромашка (квітки). Вологість до 13%. Розглянемо різні обсяги.", name: "Виробник чаїв", postedAgo: "вчора" },
  { id: "b3", kind: "buy", herbId: "elderflower", price: 140, volumeKg: 300, region: "Львівська", place: "м. Львів", condition: "сушена", year: 2026, note: "Цвіт бузини, сушений, без чорніння. Пишіть ціну та умови.", name: "Аптечний склад", postedAgo: "3 дні тому" },
  { id: "b4", kind: "buy", herbId: "rosehip", price: 55, volumeKg: 2000, region: "Рівненська", place: "м. Рівне", condition: "сушена", year: 2026, note: "Купуємо шипшину весь сезон. Самовивіз з області.", name: "Заготівельник", postedAgo: "тиждень тому" },
];

export const listingById = (id: string) => listings.find((l) => l.id === id);
