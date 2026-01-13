/**
 * map 사용해서 풀이
 */
export const groupByMap = <T, K>(array: Array<T>, keyFn: (target: T) => K) => {
  return array.reduce<Map<K, T[]>>((acc, cur) => {
    const key = keyFn(cur);

    if (acc.has(key) && Array.isArray(acc.get(key))) {
      const target = acc.get(key);
      target?.push(cur);
    } else {
      acc.set(key, [{ ...cur }]);
    }

    return acc;
  }, new Map());
};

/**
 * 객체 사용해서 풀이
 */
export const groupBy = <T>(array: Array<T>, keyFn: (target: T) => string) => {
  return array.reduce<Record<string, T[]>>((acc, cur) => {
    const key = keyFn(cur);
    if (acc[key] && Array.isArray(acc[key])) {
      acc[key].push(cur);
    } else {
      acc[key] = [{ ...cur }];
    }

    return acc;
  }, {});
};

/**
 * AI 풀이 (Map사용)
 */
export const groupByAI = <T>(
  array: T[],
  keyFn: (item: T) => PropertyKey
): Record<PropertyKey, T[]> => {
  return array.reduce<Record<PropertyKey, T[]>>((acc, cur) => {
    const key = keyFn(cur);
    (acc[key] ??= []).push(cur);
    return acc;
  }, {});
};

/**
 * AI 풀이 (객체 사용)
 */
export const groupByMapAI = <T, K>(
  array: T[],
  keyFn: (item: T) => K
): Map<K, T[]> => {
  return array.reduce<Map<K, T[]>>((acc, cur) => {
    const key = keyFn(cur);
    const group = acc.get(key);

    if (group) {
      group.push(cur);
    } else {
      acc.set(key, [cur]);
    }

    return acc;
  }, new Map());
};
