// Головна: короткий заголовок → ціни тижня → стрічка оголошень.
import { Feed } from "@/components/Feed";
import { PricesStrip } from "@/components/PricesStrip";
import { DEMO } from "@/lib/brand";

export default function Home() {
  return (
    <>
      {DEMO && (
        <div className="bg-accent-soft px-4 py-2 text-center text-[13px] text-accent-strong">
          Пробна версія: оголошення — приклади.
        </div>
      )}
      <section className="mx-auto max-w-5xl px-4 pt-5">
        <h1 className="text-[22px] font-bold leading-tight tracking-tight md:text-[34px]">
          Продавайте лікарські рослини.<br className="hidden sm:block" /> Знаходьте покупців.
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">Збирачі й закупівельники з усієї України — напряму, без посередників.</p>
      </section>
      <PricesStrip />
      <div className="mt-6"><Feed /></div>
    </>
  );
}
