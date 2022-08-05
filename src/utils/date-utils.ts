
export const dayNumber = (): number => {
  const now = new Date(); // Data de hoje
  const past = new Date(2022, 6, 26, 0, 0, 0, 0); // Data de inicio
  const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos

  return days-1;
}