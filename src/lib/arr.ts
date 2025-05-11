export const addItem = <T>(arr: Array<T>, item: T) => {
  return [...arr, item];
};

export const sumOfSquaredEvens = (arr: number[]) => {
  return arr
    .filter((a) => a % 2 === 0)
    .map((a) => a * a)
    .reduce((acc, cur) => acc + cur);
};
