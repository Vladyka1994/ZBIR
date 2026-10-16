"use client";
// Каркас: шапка, нижнє меню на телефоні, реєстрація service worker (щоб сайт ставився як застосунок).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon, Logo } from "./Icon";
import { brand, basePath } from "@/lib/brand";

const tabs = [
  { href: "/", label: "Головна", icon: "home" },
  { href: "/tsiny/", label: "Ціни", icon: "chart" },
  { href: "/podaty/", label: "Подати", icon: "plus", primary: true },
  { href: "/profil/", label: "Профіль", icon: "user" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-glass backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link href="/" className="pressable flex items-center gap-2" aria-label={`${brand.name} — на головну`}>
          <Logo />
          <span className="text-[19px] font-bold tracking-tight text-accent">{brand.name}</span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {tabs.filter((t) => !t.primary).map((t) => (
            <Link key={t.href} href={t.href}
              className={`rounded-full px-3.5 py-2 text-[14px] font-medium ${isActive(path, t.href) ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`}>
              {t.label}
            </Link>
          ))}
        </nav>
        <Link href="/podaty/" className="pressable ml-auto hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent md:flex">
          <Icon name="plus" size={16} strokeWidth={2.4} /> Подати оголошення
        </Link>
      </div>
    </header>
  );
}

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-glass backdrop-blur-xl md:hidden" aria-label="Основне меню">
      <ul className="mx-auto grid h-[60px] max-w-md grid-cols-4">
        {tabs.map((t) => {
          const active = isActive(path, t.href);
          return (
            <li key={t.href}>
              <Link href={t.href} className="pressable flex h-full flex-col items-center justify-center gap-0.5">
                {t.primary ? (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-on-accent shadow-card">
                    <Icon name="plus" size={20} strokeWidth={2.4} />
                  </span>
                ) : (
                  <Icon name={t.icon} size={23} className={active ? "text-accent" : "text-muted"} strokeWidth={active ? 2.2 : 1.8} />
                )}
                <span className={`text-[11px] font-medium ${active || t.primary ? "text-ink" : "text-muted"}`}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => {});
  }, []);
  return null;
}
