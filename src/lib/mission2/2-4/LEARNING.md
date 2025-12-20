## compose 함수 구현 학습 기록

```ts
구현 조건
- compose(...fns)는 여러 함수를 오른쪽 → 왼쪽으로 순차적으로 실행하는 함수입니다.
- compose(f, g, h)(x)는 f(g(h(x))) 와 동일한 결과를 반환해야 합니다.
- pipe와 반대로 동작해야 하며, 동일하게 제네릭 타입을 사용해 타입 안전성을 확보하세요.
- App.tsx에서 pipe와 비교해 결과를 테스트하세요.

// 실행 예시
const add1 = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

const composed = compose(square, double, add1);
console.log(composed(2)); // square(double(add1(2))) = 36
```

### 구현 후기

이미 구현해봤던 pipe와 같은데 실행 방향만 우측이라는 점에서 reduceRight를 사용해서 금방 해결할 수 있었다.

또, pipe 구현할 때 초기값 설정에 애먹었던 게 떠올라서 이번엔 리턴 콜백에서 받은 value를 초기값으로 세팅해주는 부분도 잊지 않았다.

아마 어제 구현했던걸 우측으로 실행하는 버전으로 다시 구현한거라, 큰 틀에서 로직이 바뀐게 아니라서 잊혀질 쯤에 다시 한번 구현해보는게 좋을 것 같다.

#### 1. Function 타입 사용 불가

`Function` 타입을 사용하려고 했더니 ESLint 에러가 발생했다.

```ts
The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.
eslint@typescript-eslint/no-unsafe-function-type
```

`Function` 타입은 `any`와 비슷한 수준으로 타입 안전성이 없어서 사용을 권장하지 않는다고 한다.

**해결 방법**

`(...args: any[]) => any` 형태로 명시적인 함수 시그니처를 정의하거나, 타입 별칭을 만들어서 사용한다.

나는 이번엔 any를 사용하지 않고 `unknown`을 사용했다.

```ts
type AnyFunction = (...args: unknown[]) => unknown;
```

#### 2. 화살표 함수의 오버로드 타이핑

함수 오버로드 타이핑을 시도했는데 화살표 함수에서는 에러가 발생했다.

알고보니 화살표 함수는 직접적인 오버로드가 불가능했다.

**왜 안 되지?**

- 함수 선언문(`function`)은 같은 이름의 여러 선언을 병합할 수 있음
- 화살표 함수는 변수에 할당되는 값(expression)이므로 같은 이름의 변수를 여러 번 선언할 수 없음
- TypeScript에서 `const`로 선언된 변수는 재선언이 불가능함

**해결 방법**

interface나 type으로 오버로드 시그니처를 정의하고, 화살표 함수에 타입을 할당한다.

```ts
interface Compose {
  (f: (arg: A) => B): (arg: A) => B;
  (f: (arg: B) => C, g: (arg: A) => B): (arg: A) => C;
  // ...
}

export const compose: Compose = (...fns: AnyFunction[]) => {
  return <V>(v: V) => fns.reduceRight((acc, cur) => cur(acc) as V, v);
```

#### 3. 타입 추론의 복잡성

제네릭을 활용한 타입 추론 부분이 여전히 어렵다.

특히 함수 체이닝에서 각 함수의 입출력 타입이 올바르게 연결되도록 보장하는 타입 시스템을 구현하는 것이 복잡하다.

현재는 함수 오버로드 방식으로 최대 5개 정도의 함수 조합까지 타입 안전성을 확보하는 방식으로 타협했다.
(이번에도 타이핑은 ai의 도움을 받았다..ㅠ)

더 깊은 이해를 위해서는 TypeScript의 고급 타입 기능들을 더 학습해야 할 것 같다.

### 배운 점

- TypeScript에서 `Function` 타입은 타입 안전성이 없어 사용을 지양해야 한다.
- 화살표 함수는 변수 선언이므로 직접 오버로드할 수 없으며, 타입 정의를 분리해야 한다.
- 함수 선언문과 화살표 함수의 근본적인 차이(선언 vs 표현식)를 이해하게 되었다.
