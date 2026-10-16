import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="text-[64px] font-bold text-accent">404</div>
      <h1 className="mt-2 text-[22px] font-semibold">Такої сторінки немає</h1>
      <Link href="/" className="pressable mt-6 inline-flex h-12 items-center rounded-xl bg-accent px-6 font-semibold text-on-accent">На головну</Link>
    </div>
  );
}
