/**
 * 1차 풀이
 */
export const mapWithReduce = <T, R>(array: Array<T>, fn: (target: T) => R) => {
  return array.reduce((acc: R[], cur: T) => {
    const newValue = fn(cur);
    acc.push(newValue);
    return acc;
  }, []);
};
