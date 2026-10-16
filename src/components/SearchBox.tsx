"use client";
// Рядок пошуку з підказками: з перших літер показує рослини, розуміє помилки й народні назви.
// Порожній рядок → популярні рослини. Панель накладається поверх сторінки — нічого не зсуває під пальцем.
import { useRef, useState } from "react";
import { HerbArt } from "./HerbArt";
import { Icon } from "./Icon";
import { herbById } from "@/data/herbs";
import { matchHerbs, popular } from "@/lib/search";

export function SearchBox({ value, onChange }: { value: string; onChange: (q: string) => void }) {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const found = value.trim() ? matchHerbs(value).slice(0, 6) : [];

  const pick = (name: string) => {
    onChange(name);
    setOpen(false);
    input.current?.blur(); // ховаємо клавіатуру — людина одразу бачить результат
  };

  return (
    <div className="relative">
      <label className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-surface px-4 shadow-card focus-within:border-accent">
        <Icon name="search" size={20} className="text-muted" />
        <span className="sr-only">Пошук</span>
        <input ref={input} value={value} type="search" placeholder="Яку рослину шукаєте?" autoComplete="off" enterKeyHint="search"
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
          onKeyDown={(e) => { if (e.key === "Enter") { setOpen(false); input.current?.blur(); } }}
          aria-expanded={open} aria-controls="search-suggest" role="combobox" aria-autocomplete="list"
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted focus-visible:outline-none" />
        {value && (
          <button type="button" aria-label="Очистити пошук" className="text-muted"
            onPointerDown={(e) => e.preventDefault()} onClick={() => { onChange(""); input.current?.focus(); }}>
            <Icon name="x" size={18} />
          </button>
        )}
      </label>

      {open && (
        <div id="search-suggest" role="listbox" onPointerDown={(e) => e.preventDefault()}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          {!value.trim() ? (
            <div className="p-3">
              <p className="px-1 text-[13px] text-muted">Часто шукають</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {popular.map((id) => {
                  const h = herbById(id);
                  return (
                    <button key={id} type="button" role="option" aria-selected={false} onClick={() => pick(h.name)}
                      className="pressable h-9 rounded-full bg-surface-2 px-3.5 text-[14px] font-medium">{h.name}</button>
                  );
                })}
              </div>
            </div>
          ) : found.length ? (
            <ul>
              {found.map((h) => (
                <li key={h.id}>
                  <button type="button" role="option" aria-selected={false} onClick={() => pick(h.name)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-surface-2 active:bg-surface-2">
                    <HerbArt herbId={h.id} className="h-10 w-10 shrink-0 rounded-xl" />
                    <span className="min-w-0">
                      <span className="block truncate text-[16px] font-medium">{h.name}</span>
                      <span className="block text-[13px] text-muted">{h.part}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-[14px] text-muted">Такої рослини не знайшли. Спробуйте написати інакше.</p>
          )}
        </div>
      )}
    </div>
  );
}
