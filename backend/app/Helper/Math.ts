export const getRandomInt = (min: number, max: number) => {
  const minInt: number = Math.ceil(min)
  const maxInt: number = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}
