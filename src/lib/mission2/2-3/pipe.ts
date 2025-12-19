// 1차 풀이
// export const pipe = (...fns: any[]) => {
//   return <T>(n: T) => {
//     const first = fns[0];
//     return fns.slice(1).reduce((acc, fn) => {
//       return fn(acc);
//     }, first(n));
//   };
// };

// ai 리뷰 버전
export const pipe = <T>(...fns: Array<(arg: T) => T>) => {
  return (initialValue: T): T => {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
};
