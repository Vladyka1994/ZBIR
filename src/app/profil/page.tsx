// Профіль / вхід. Поки без бази — тільки вигляд. Вхід за телефоном підключимо разом із базою.
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Профіль" };

export default function Profile() {
  return (
    <div className="mx-auto max-w-md px-4 pt-10 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface-2 text-muted"><Icon name="user" size={30} /></span>
      <h1 className="mt-4 text-[22px] font-bold">Вхід</h1>
      <p className="mt-2 text-[15px] text-muted">Скоро тут можна буде увійти за номером телефону, щоб керувати своїми оголошеннями.</p>
      <div className="mt-6 rounded-2xl border border-line bg-surface p-4 text-left">
        <label className="block text-[14px] font-medium">Номер телефону
          <input disabled type="tel" placeholder="+380" className="mt-1.5 h-12 w-full rounded-xl border border-line bg-surface-2 px-3 text-[16px]" />
        </label>
        <button disabled className="mt-3 h-12 w-full rounded-xl bg-accent font-semibold text-on-accent opacity-50">Отримати код</button>
        <p className="mt-2 text-center text-[12px] text-muted">Пробна версія — вхід ще не працює.</p>
      </div>
    </div>
  );
}
