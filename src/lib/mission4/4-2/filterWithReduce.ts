export const filterWithReduce = <T>(
  array: Array<T>,
  predicate: (target: T) => boolean
) => {
  return array.reduce<T[]>((acc, cur) => {
    if (!predicate(cur)) return acc;

    acc.push(cur);
    return acc;
  }, []);
};
