## filterWithReduce 함수 구현 학습 기록

> 미션 개요

- Array.prototype.reduce 메서드를 사용하여 filter 함수를 구현한다.
- 구현 조건은 아래 사항을 따른다.

```ts
구현 조건
- Array.prototype.reduce를 사용해 filter를 구현합니다.
- filterWithReduce(array, predicate) 형태로 동작합니다.
- predicate가 true를 반환하는 요소만 포함한 배열을 반환합니다.

// 실행 예시
const numbers = [1, 2, 3, 4, 5, 6];
const evens = filterWithReduce(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]
```

## 러닝포인트 : Reduce로 바라본 추상화의 차이 (Map과 Filter)

어제는 map, 오늘은 filter를 연달아 구현해보니 두 메서드가 reduce로 구현했을 때 어떻게 동작하는지 구조적인 차이가 명확히 보였다.

결국 두 메서드 모두 초기값을 빈 배열로 시작해 하나씩 채워나가는 과정은 동일하지만, push하는 로직에서 결정적인 차이가 있었다.

```ts
// map
acc.push(fn(cur));

// filter
if (predicate(cur)) acc.push(cur);
```

map은 조건 없이 모든 요소를 변환하여 acc에 담는 형태였다면 filter는 predicate 조건을 통과한 요소만 acc 배열에 담는다.

이를 통해 reduce가 배열 순회와 누적을 담당하는 낮은 레벨의 도구라는 점을 알 수 있었고 reduce를 잘 활용하면 로직을 예쁘게 추상화해볼 수 있을 것 같단 생각이 들었다.
