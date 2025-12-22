// 1차 시도

// type Obj<T> = {
//   [key: string]: T;
// };

// type UpdateFn<T> = (current: T) => T;

// export const updateIn = <T>(
//   obj: Obj<T>,
//   path: string[],
//   updateFn: UpdateFn<T>
// ) => {
//   const newObj = { ...obj };

//   for (let i = 0; i < path.length; i++) {
//     const key = path[i];

//     if (typeof newObj[key] === 'object') {
//       newObj[key] = {
//         ...updateIn(newObj[key], path.slice(i + 1), updateFn),
//       };
//       return newObj;
//     } else {
//       newObj[key] = updateFn();
//     }
//   }

//   return newObj;
// };

// 2차 시도
// export const updateIn = (obj, path, updateFn) => {
//   let newObj = { ...obj };

//   if (path.length === 1) {
//     newObj = {
//       ...newObj,
//       [path[0]]: updateFn(),
//     };

//     return newObj;
//   }

//   // path가 1개이면
//   // 현재 오브젝트에서 바로 바꿔서 리턴
//   // path가 1개 초과이면
//   // 재귀로 돌리는데 obj의 뎁스를 하나 줄여서 보내야함.

//   const result = updateIn(obj[path[0]], path.slice(1), updateFn);

//   return {
//     ...obj,
//     [path[0]]: result,
//   };
// };

// ai 리뷰 버전
type UpdateFn<T> = (current: T) => T;

export const updateIn = <T extends Record<string, unknown>>(
  obj: T,
  path: string[],
  updateFn: UpdateFn<unknown>
): T => {
  // 경로의 끝에 도달 - 값 업데이트
  if (path.length === 1) {
    return {
      ...obj,
      [path[0]]: updateFn(obj[path[0]]),
    };
  }

  // 중간 경로 - 재귀적으로 처리
  const [head, ...tail] = path;

  return {
    ...obj,
    [head]: updateIn(obj[head] as Record<string, unknown>, tail, updateFn),
  };
};
