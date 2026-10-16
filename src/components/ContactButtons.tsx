"use client";
// Кнопки зв'язку: «Подзвонити» + Viber / Telegram, якщо продавець їх має.
// У пробній версії номерів нема — показуємо пояснення замість дзвінка.
import { useState } from "react";
import { Icon } from "./Icon";
import type { Listing } from "@/data/listings";

export function ContactButtons({ l, full = false }: { l: Listing; full?: boolean }) {
  const [shown, setShown] = useState(false);
  const buy = l.kind === "buy";
  const main = buy ? "bg-orange text-on-orange" : "bg-accent text-on-accent";
  const show = () => setShown((v) => !v);
  return (
    <div>
      <button type="button" onClick={show}
        className={`pressable flex w-full items-center justify-center gap-2 rounded-xl font-semibold ${main} ${full ? "h-13 text-[16px]" : "h-11 text-[15px]"}`}>
        <Icon name="phone" size={18} strokeWidth={2.2} /> {buy ? "Запропонувати товар" : "Подзвонити"}
      </button>
      {full && (l.messengers.viber || l.messengers.telegram) && (
        <div className="mt-2 grid grid-flow-col gap-2">
          {l.messengers.viber && (
            <button type="button" onClick={show} className="pressable h-12 rounded-xl border border-line bg-surface font-semibold text-[#7360f2]">Viber</button>
          )}
          {l.messengers.telegram && (
            <button type="button" onClick={show} className="pressable h-12 rounded-xl border border-line bg-surface font-semibold text-[#229ed9]">Telegram</button>
          )}
        </div>
      )}
      {shown && (
        <p role="status" className="mt-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px] text-muted">
          Це пробна версія: оголошення — приклад, контактів ще нема. Справжні з&apos;являться, коли люди почнуть подавати оголошення.
        </p>
      )}
    </div>
  );
}
