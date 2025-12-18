## curry 함수 구현 학습 기록

```ts
구현 조건
- 다중 인자를 받는 함수를 커링 형태로 바꾸는 함수를 구현하세요.
- curry(fn)는 (a)(b)... 방식으로 원래 함수를 순차적으로 호출할 수 있게 합니다.
- 인자를 모두 전달받으면 원래 함수의 결과를 반환해야 합니다.
- 함수의 인자 개수는 최소 2개 이상이라고 가정합니다.
- App.tsx에서 테스트하여 결과를 확인하세요.
```

```ts
// 실행 예시

const sum = (a: number, b: number, c: number) => a + b + c;
const curriedSum = curry(sum);

const result = curriedSum(1)(2)(3);
console.log(result); // 6
```

### curry 함수 구현하면서 어려웠던 점과 배운 점

1. 함수 시그니처를 어떻게 쪼개야하지?

문제를 단순하게 시작하기 위해 먼저 요구사항을 작은 단위로 나눠서 생각했다.

- 예시의 sum 함수는 3개의 인자를 받음
- 총 3번 나눠서 호출할 수 있어야 함
- 커링된 함수를 포함해서 4번의 리턴이 필요함

그 결과 다음과 같은 코드가 작성이 됐다.

```ts
export const curry_1차풀이 = <T, R>(fn: (...args: T[]) => R) => {
  return (a: T) => {
    return (b: T) => {
      return (c: T) => {
        return fn(a, b, c);
      };
    };
  };
};
```

**이 코드의 문제점**

- 인자가 3개로 고정되어 있어서 재사용이 불가능함.

**해결방법**

- 재귀를 통해 중복로직을 제거한다.
- fn.length를 사용하여 함수 인자 개수를 파악하여 재귀 함수 종료 조건을 만든다.

```ts
if (args.length >= fn.length) {
  // 재귀함수 종료 조건
  // 인자가 다 모였으면 함수 호출
  return fn(...(args as P));
}

return (...nextArgs: unknown[]) => {
  // 인자가 아직 덜 모였다면 다 모일 때까지 함수 리턴
  return curried(...args, ...nextArgs);
};
```

해결방법 역시 여러 자료들을 찾아보고 AI에게 질문해가며 작성했다.
인자 개수가 다 모였을 때 원본 함수를 실행할 수 있도록 재귀함수의 종료 조건을 작성했고
인자가 덜 모였을 때는 다 모일 때까지 함수를 리턴해주는 형태로 동작하도록 처리하면
커링을 재사용할 수 있는 함수로 만들 수 있다는 것을 알게됐다.

### 2. 제네릭 타이핑은 너무 어렵다.

```ts
type Curry<P extends unknown[], R> = P extends [infer First, ...infer Rest]
  ? (arg: First) => Rest extends [] ? R : Curry<Rest, R>
  : R;
```

ai의 도움을 받아서 이해하면서 작성하려고 노력했다.

infer와 extends에 대해서 다시 개념을 잡게 됐다.

처음에는 클래스의 `extends`(상속)와 혼동해서 "이걸 어떻게 상속하란 거지?"라고 생각했다.

TypeScript의 `extends`는 할당이 가능한지(부분집합인지)를 체크하는 것이라는 걸 알 게 됐다.

## 핵심 개념 정리

### 재귀함수

- 조건을 만족할 때까지 자기 자신을 호출

### 타입스크립트 infer

타입을 추출할 때 사용하는 키워드

### 타입스크립트 extends

- 할당이 가능한지, 부분 집합의 개념

- A extends B ? C : D 형태는 타입 레벨에서의 삼항 연산자로 A가 B의 부분집합이면 C, 아니면 D

---

> 타입스크립트가 너무 어렵다.....ㅠㅠㅠ
