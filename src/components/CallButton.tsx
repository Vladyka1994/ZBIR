"use client";
// Кнопка «Подзвонити». У пробній версії номерів нема — показуємо пояснення замість дзвінка.
import { useState } from "react";
import { Icon } from "./Icon";

export function CallButton({ kind, big = false }: { kind: "sell" | "buy"; big?: boolean }) {
  const [shown, setShown] = useState(false);
  const color = kind === "buy" ? "bg-orange text-on-orange" : "bg-accent text-on-accent";
  return (
    <div>
      <button type="button" onClick={() => setShown((v) => !v)}
        className={`pressable flex w-full items-center justify-center gap-2 rounded-xl font-semibold ${color} ${big ? "h-13 text-[16px]" : "h-11 text-[15px]"}`}>
        <Icon name="phone" size={18} strokeWidth={2.2} /> {kind === "buy" ? "Запропонувати товар" : "Подзвонити"}
      </button>
      {shown && (
        <p role="status" className="mt-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px] text-muted">
          Це пробна версія: оголошення — приклад, номера ще нема. Справжні номери з&apos;являться, коли люди почнуть подавати оголошення.
        </p>
      )}
    </div>
  );
}
