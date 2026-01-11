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

/**
 * AI에게 코드 리뷰 받은 후 타이핑 수정
 */
const mapWithReduce2 = <T, R>(array: Array<T>, fn: (target: T) => R) => {
  return array.reduce<R[]>((acc, cur) => {
    const newValue = fn(cur);
    acc.push(newValue);
    return acc;
  }, []);
};
