// 직접 짠 코드
const updateAt = <V>(array: V[], index: number, updateFn: (n: V) => V) => {
  // 잘못된 인덱스는 원본 반환
  if (index < 0 || array.length <= index) return array;

  // updateFn은 현재 값을 받아 새 값을 반환
  // 원본 배열을 변경하지 않고 새 배열을 반환해야함
  const newArray = [...array];
  newArray[index] = updateFn(newArray[index]);

  return newArray;
};

export default updateAt;

// AI 코드
// function updateAt<T>(
//   array: T[],
//   index: number,
//   updateFn: (value: T) => T
// ): T[] {
//   // 인덱스가 범위를 벗어나면 원본 반환
//   if (index < 0 || index >= array.length) {
//     return array;
//   }

//   // 새 배열 생성 후 해당 인덱스만 업데이트
//   return array.map((item, i) => (i === index ? updateFn(item) : item));
// }
