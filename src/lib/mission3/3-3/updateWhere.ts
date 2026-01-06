const updateWhere = <T>(
  collection: T | T[],
  predicate: (target: T) => boolean,
  updateFn: (target: T) => T | T[]
) => {
  if (Array.isArray(collection)) {
    return collection.map((collect) => {
      if (predicate(collect)) {
        return updateFn(collect);
      }
      return collect;
    });
  }

  return predicate(collection) ? updateFn(collection) : collection;
};

// 1차 구현 시도

// 배열, 객체 모두 지원해야함. (불변성 유지)
// const updateWhere = <T>(
//   collection: object | T[],
//   predicate: (v: T | object) => boolean,
//   updateFn: (v: T | object) => T | object
// ) => {
//   // 단일 객체인 경우
//   if (typeof collection === 'object') {
//     // predicate가 true일 때만 업데이트
//     if (predicate(collection)) {
//       return updateFn(collection);
//     }
//   }

//   const newCollection = [...(collection as T[])];

//   // 조건을 만족하는 요소만 업데이트
//   return newCollection.map((c) => {
//     if (predicate(c)) {
//       return updateFn(c);
//     }

//     return c;
//   });
// };

export default updateWhere;
