// Назва бренду й адреса сайту — в одному місці.
export const brand = {
  name: "Збір",
  tagline: "Маркетплейс лікарських рослин",
  description: "Продавайте зібрану лікарську сировину і знаходьте закупівельників по всій Україні.",
};

// GitHub Pages віддає сайт з підшляху /ZBIR/, локально — з кореня.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${basePath}${p}`;

// Поки нема бази даних — сайт показує приклади оголошень.
export const DEMO = true;
