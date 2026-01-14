/** 내가 작성한 코드 */
export const partition = <T>(
  array: Array<T>,
  predicate: (target: T) => boolean
) => {
  return array.reduce<T[][]>(
    (acc, cur) => {
      if (predicate(cur)) {
        acc[0].push(cur);
      } else {
        acc[1].push(cur);
      }

      return acc;
    },
    [[], []]
  );
  // true인 요소, false인 요소 배열로 분리해서 리턴 (2차원배열)
};

/** AI가 리뷰 후 개선해준 코드 */
export const partitionAI = <T>(
  array: Array<T>,
  predicate: (target: T) => boolean
): [T[], T[]] => {
  return array.reduce<[T[], T[]]>(
    (acc, cur) => {
      const [pass, fail] = acc;
      if (predicate(cur)) {
        pass.push(cur);
      } else {
        fail.push(cur);
      }
      return acc;
    },
    [[], []]
  );
};
