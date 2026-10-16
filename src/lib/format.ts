// Форматування чисел і цін для людей.
export const uah = (n: number) => `${n.toLocaleString("uk-UA")} грн`;
export const kg = (n: number) => (n >= 1000 ? `${(n / 1000).toLocaleString("uk-UA")} т` : `${n.toLocaleString("uk-UA")} кг`);
