export const getObjectDate = (date: string) => {
  const [ year, month, day] = date.split('-');
  return { day, month, year }
}

export const getObjectTime = (time: string) => {
  time = time.substring(1, time.length - 1);
  const [hour, minutes] = time.split(":");
  return { hour, minutes }
}
