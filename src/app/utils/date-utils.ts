export const getObjectDate = (date: string) => {
  const parts = date.split('/');
  return {
    day: parts[0],
    month: parts[1],
    year: parts[2]
  }
}

export const getObjectTime = (time: string) => {
  time = time.substring(1, time.length - 1);
  const parts = time.split(":");
  return {
    hour: parts[0],
    minutes: parts[1]
  }
}
