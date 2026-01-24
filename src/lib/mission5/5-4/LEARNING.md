## lazyMap 함수 구현 학습 기록

```ts
구현 조건
- lazyMap(iterable, fn) 형태의 제너레이터 함수를 구현합니다.
- 각 요소에 fn을 적용한 결과를 yield합니다.
- 필요할 때만 계산하도록 게으르게 동작합니다.

// 실행 예시
const numbers = range(1, 100);
const doubled = lazyMap(numbers, (n) => n * 2);
const filtered = lazyFilter(doubled, (n) => n % 3 === 0);
const result = [...take(filtered, 5)];
console.log(result); // [6, 12, 18, 24, 30]

```

> ### 구현 코드

```ts
export function* lazyMap<T, R>(iterable: Iterable<T>, fn: (item: T) => R) {
  for (const item of iterable) {
    yield fn(item);
  }
}
```

lazyFilter처럼 구현은 어렵지 않았다!

제네릭 사용해서 fn의 입력 타입과 출력 타입이 다를 수 있다는 점을 고려하여 T, R로 분리해주었다.
이터러블 프로토콜도 모든 Iterable이 들어올 수 있도록 했다.

다만.. 이번에도 역시 테스트 코드 작성할 때 생각이 잘 안나서 layFilter 테스트 코드 참고하면서 복습하는 느낌으로 작성해봤다.

마침 함수 스파이 넣는 부분을 까먹었던터라 상기하는데 도움이 됐다.

### 회고

이번에도 역시 `vi.fn`의 중요성을 느낄 수 있었는데 lazy를 테스트할 때 함수가 몇 회 호출되는지가 유용하게 사용됐다.

`[Symbol.iterator]()`를 수동으로 호출하고 `next()`를 호출해보는 과정을 통해 제너레이터가 내부적으로 어떻게 상태를 유지하고 값을 yield하는지 조금이나마 알 수 있었다.

아직 어색하긴 하지만..ㅎㅎ 함수의 실행이 일시 중지 된다는 점은 언제 봐도 신기한 것 같다.
