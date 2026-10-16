// Приклади оголошень (пробна версія, без бази). Імена вигадані, ситуації — як у реальних Facebook-групах.
import type { Unit } from "@/lib/format";

/** Одна позиція: рослина + ціна. В оголошенні їх може бути кілька (прайс-лист). */
export type Item = {
  herbId: string;
  name?: string; // для «Інша рослина» — назва, яку написала людина
  price: number | null; // null — «ціна договірна»
  unit: Unit;
};

export type Listing = {
  id: string;
  kind: "sell" | "buy"; // Продам / Куплю
  items: Item[];
  volume?: string; // «50 кг», «10 відер», «від 100 кг»
  region: string;
  place?: string; // район або місто
  condition: "суха" | "свіжа";
  year?: number;
  clean?: boolean; // «чисто, без домішок»
  trade: "retail" | "opt" | "both"; // роздріб / опт
  delivery: { np: boolean; pickup: boolean }; // Нова пошта / самовивіз
  messengers: { viber: boolean; telegram: boolean };
  note: string;
  name: string;
  postedAgo: string;
};

const both = { np: true, pickup: true };
const np = { np: true, pickup: false };
const pickup = { np: false, pickup: true };
const vb = { viber: true, telegram: false };
const vbtg = { viber: true, telegram: true };
const none = { viber: false, telegram: false };

export const listings: Listing[] = [
  { id: "s1", kind: "sell", items: [{ herbId: "chamomile", price: 75, unit: "kg" }], volume: "50 кг", region: "Волинська", place: "Ковельський р-н", condition: "суха", year: 2026, clean: true, trade: "both", delivery: both, messengers: vb, note: "Ромашка (квітки), добре висушена в тіні. Без домішок, зберігаю в сухому.", name: "Олена", postedAgo: "сьогодні" },
  { id: "s2", kind: "sell", items: [
      { herbId: "lungwort", price: 450, unit: "kg" }, { herbId: "violet", price: 450, unit: "kg" }, { herbId: "hawthorn-flower", price: 250, unit: "kg" },
      { herbId: "dandelion-flower", price: 350, unit: "kg" }, { herbId: "clover", price: 500, unit: "kg" }, { herbId: "plantain", price: 300, unit: "kg" },
      { herbId: "thyme", price: 500, unit: "kg" }, { herbId: "mint", price: 300, unit: "kg" }, { herbId: "horsetail", price: 100, unit: "kg" }, { herbId: "strawberry-herb", price: 500, unit: "kg" }, { herbId: "chamomile", price: 350, unit: "kg" },
    ], region: "Тернопільська", place: "Підволочиський р-н", condition: "суха", year: 2026, clean: true, trade: "both", delivery: np, messengers: vbtg, note: "Маю на продаж лікарські рослини чудової якості. Фото й відео сировини надішлю на запит.", name: "Ганна", postedAgo: "сьогодні" },
  { id: "s3", kind: "sell", items: [{ herbId: "cranberry", price: 130, unit: "l" }], volume: "відра по 5 і 10 л", region: "Житомирська", place: "Овруцький р-н", condition: "свіжа", year: 2026, trade: "both", delivery: np, messengers: vb, note: "Свіжа журавлина. Відро 5 л — 650 грн, 10 л — 1300 грн, тара окремо. Пересилаю по Україні Новою поштою.", name: "Сергій", postedAgo: "сьогодні" },
  { id: "s4", kind: "sell", items: [{ herbId: "air-root", price: 90, unit: "kg" }], volume: "100 кг", region: "Львівська", place: "м. Дрогобич", condition: "суха", year: 2026, clean: true, trade: "opt", delivery: both, messengers: none, note: "Корінь аїру, чистий, порізаний. Від 10 кг.", name: "Іван", postedAgo: "вчора" },
  { id: "s5", kind: "sell", items: [{ herbId: "peony-petals", price: 50, unit: "100g" }], region: "Київська", place: "м. Київ", condition: "суха", year: 2026, clean: true, trade: "retail", delivery: np, messengers: vbtg, note: "Пелюстки півонії, ароматні, цілі. Для чаю, косметики й декору.", name: "Наталія", postedAgo: "вчора" },
  { id: "s6", kind: "sell", items: [
      { herbId: "clover", price: null, unit: "kg" }, { herbId: "dandelion-flower", price: null, unit: "kg" }, { herbId: "bird-cherry-flower", price: null, unit: "kg" },
      { herbId: "primrose", price: null, unit: "kg" }, { herbId: "hypericum", price: null, unit: "kg" },
    ], region: "Тернопільська", place: "Підволочиський р-н", condition: "суха", year: 2026, trade: "both", delivery: both, messengers: vb, note: "Продам цвіт конюшини, кульбаби, черемхи, первоцвіт, звіробій. Ціна залежить від обсягу — дзвоніть.", name: "Микола", postedAgo: "2 дні тому" },
  { id: "s7", kind: "sell", items: [{ herbId: "melissa", price: 300, unit: "kg" }], volume: "200 кг", region: "Полтавська", place: "Лубенський р-н", condition: "суха", year: 2026, clean: true, trade: "opt", delivery: both, messengers: vb, note: "Сухий лист меліси лікарської з власного поля.", name: "Трави Полтавщини", postedAgo: "3 дні тому" },
  { id: "s8", kind: "sell", items: [{ herbId: "calendula", price: 130, unit: "kg" }], volume: "≈3 кг", region: "Хмельницька", place: "Кам'янець-Подільський", condition: "суха", year: 2026, trade: "retail", delivery: np, messengers: none, note: "Квіт нагідок (календули), приблизно 3 кг.", name: "Надія", postedAgo: "4 дні тому" },
  { id: "s9", kind: "sell", items: [{ herbId: "cherry-dried", price: 150, unit: "kg" }], volume: "40 кг", region: "Житомирська", place: "Бердичівський р-н", condition: "суха", year: 2026, trade: "both", delivery: np, messengers: vb, note: "Сушена вишня з кісточкою. Урожай 2026.", name: "Інна", postedAgo: "тиждень тому" },
  { id: "s10", kind: "sell", items: [{ herbId: "linden", price: 180, unit: "kg" }], volume: "30 кг", region: "Рівненська", place: "м. Сарни", condition: "суха", year: 2026, clean: true, trade: "retail", delivery: both, messengers: none, note: "Липовий цвіт з приквітками, зібраний у червні далеко від доріг.", name: "Галина", postedAgo: "тиждень тому" },
  { id: "s11", kind: "sell", items: [{ herbId: "elderberry", price: null, unit: "kg" }], volume: "великий опт", region: "Харківська", place: "Зачепилівський р-н", condition: "суха", year: 2026, clean: true, trade: "opt", delivery: pickup, messengers: vbtg, note: "Продаємо суху ягоду бузини великим оптом. Ціна — від обсягу.", name: "Плоди України", postedAgo: "тиждень тому" },
  { id: "b1", kind: "buy", items: [{ herbId: "horse-chestnut", price: 20, unit: "kg" }], volume: "від 1 т", region: "Харківська", place: "Зачепилівський р-н", condition: "суха", trade: "both", delivery: pickup, messengers: vbtg, note: "Купуємо кінський каштан у роздріб та опт. Гнучкі умови оплати й доставки.", name: "Плоди України", postedAgo: "сьогодні" },
  { id: "b2", kind: "buy", items: [{ herbId: "air-root", price: 85, unit: "kg" }], volume: "5 т", region: "Волинська", place: "м. Луцьк", condition: "суха", trade: "opt", delivery: pickup, messengers: vb, note: "Купуємо корінь аїру великими партіями. Забираємо самі від 100 кг. Оплата одразу.", name: "Заготівельна фірма", postedAgo: "сьогодні" },
  { id: "b3", kind: "buy", items: [
      { herbId: "nettle-leaf", price: 35, unit: "kg" }, { herbId: "chamomile", price: 70, unit: "kg" }, { herbId: "hypericum", price: 55, unit: "kg" }, { herbId: "yarrow", price: 40, unit: "kg" },
    ], volume: "будь-які обсяги", region: "Київська", place: "м. Біла Церква", condition: "суха", trade: "opt", delivery: both, messengers: vbtg, note: "Виробник чаїв закуповує сировину постійно. Вологість до 13%, без домішок.", name: "Виробник чаїв", postedAgo: "вчора" },
  { id: "b4", kind: "buy", items: [{ herbId: "rosehip", price: 55, unit: "kg" }], volume: "2 т", region: "Рівненська", place: "м. Рівне", condition: "суха", trade: "opt", delivery: pickup, messengers: none, note: "Купуємо шипшину весь сезон. Самовивіз з області.", name: "Заготівельник", postedAgo: "3 дні тому" },
];

export const listingById = (id: string) => listings.find((l) => l.id === id);
