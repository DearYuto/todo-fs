## partition 함수 구현 학습 기록

> 미션 개요

- reduce를 사용하여 조건에 따라 배열을 둘로 분리하여 [true배열, false배열] 튜플 반환한다.
- 구현 조건은 아래 사항을 따른다.

```ts
구현 조건
- partition(array, predicate) 형태로 동작합니다.
- predicate가 true인 요소와 false인 요소를 분리합니다.
- [통과한 요소들, 통과하지 못한 요소들] 형태의 튜플을 반환합니다.

// 실행 예시
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(odds);  // [1, 3, 5]

```

### 초기 시도했던 코드

처음에는 `if-else`문을 피하고 싶어서 삼항 연산자를 사용했다.

하지만, 여기서 다음과 같은 타입 에러를 만났다.

```ts
export const partition = <T>(
  array: Array<T>,
  predicate: (target: T) => boolean
) => {
  return array.reduce<T[][]>(
    (acc, cur) => {
      // 타입 에러 발생
      predicate(cur) ? acc[0].push(cur) : acc[1].push(cur);
      return acc;
    },
    [[], []]
  );
};
```

`Expected an assignment or function call and instead saw an expression.eslint@typescript-eslint/no-unused-expressions`

삼항 연산자는 값을 결정하여 할당하기 위한 표현식인데 push는 배열의 상태를 변경한 후 리턴 값을 반환하고 있다.

그런데 내가 리턴한 값을 사용하지 않는다며 경고를 보내고 있었다.

린트 에러를 무시하고 사용할 수도 있었지만.. 무조건 코드를 줄이는 것보다는 값의 할당이 목적일 때는 삼항연산자를 사용하는 게 더 의도에 맞는 문법일 것 같아서 if-else 구문으로 변경하여 타입 에러를 해결할 수 있었다.

### 최종 구현 코드

```ts
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
};
```

### 2차원 배열(T[][])과 튜플([T[], T[]]) 타이핑

AI에게 코드 리뷰를 받기 전에는 2차원 배열 타입으로 리턴해야겠다고만 단순히 생각했다.

하지만, 이 문제에서는 정확히 두 개의 배열이 들어있는 쌍이라는 게 분명했기 때문에 튜플 타입이 훨씬 적절하다는 것을 알게 됐다.

> AI 개선 코드

```ts
export const partition = <T>(
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
```

## 회고

매직넘버를 사용했던 내 코드와 비교했을 때도 AI는 명확한 변수명인 pass, fail을 사용한 부분도 인상적이었다.

훨씬 더 가독성이 있는 코드라고 느껴졌는데 작은 차이지만 읽기 좋은 코드가 무엇인지 다시 한 번 생각해보는 계기가 됐다 알고있던 지식을 잘 활용하지 못한 것 같아서 아쉽기도 하고.. ㅠ ㅠ

단순히 미션을 해결하는 것에 그치지 않고, 조금 더 개선할 포인트는 없을지 질문해보는 과정이 필요하다고 느꼈다.

앞으로는 코드 한 줄을 쓸 때도 그 의도가 더 선명히 드러나도록 고민해봐야겠다.
