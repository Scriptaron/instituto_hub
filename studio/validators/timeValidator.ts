export function validateHHMM(time: string | undefined): true | string {
  if (!time) return true;
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time) ? true : 'Formato inválido. Use HH:MM, como 19:30, 20:00...';
}
