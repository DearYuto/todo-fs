## withLogging 함수 구현 학습 기록

```ts
withLogging 구현 조건
- 인자로 받은 함수(fn)를 감싸는 고차 함수를 구현합니다.
- 호출 전에는 입력값을 [before] 로그로 출력하고,
- 호출 후에는 반환값을 [after] 로그로 출력해야 합니다.
- 원래 함수의 반환값은 그대로 반환해야 합니다.
- 다양한 시그니처의 함수에도 사용할 수 있도록 제네릭을 사용하세요.
- App.tsx에서 테스트 코드를 실행해 콘솔 로그를 확인하세요.

// 실행 예시

const double = (x: number) => x * 2;
const loggedDouble = withLogging(double);
loggedDouble(5);

// 콘솔 출력
[before] 5
[after] 10
```

withLogging 함수를 구현하면서
어려웠던 점과 배운 점을 기록했어요.

## **1. 제네릭 타입의 잘못된 사용**

```typescript
// 처음 시도했던 코드
type WithLogging = <T>(cb: T) => T;

export const withLogging = (cb: WithLogging) => {
  return (input) => {
    console.log(`[before] ${input}`);

    const result = cb(input);

    console.log(`[after] ${result}`);

    return result;
  };
};
```

WithLogging의 타이핑을 위와 같이 정의해서 사용하면 될 것이라고 생각했으나, 실제 호출 시 에러가 발생했다.

> **에러 발생 위치**

```ts
const double = (x: number) => x * 2;
const loggedDouble = withLogging(double); // ❌
```

> **발생한 에러 메시지**

```
'(x: number) => number' 형식의 인수는 'WithLogging' 형식의 매개 변수에 할당될 수 없습니다.
'x' 및 'cb' 매개 변수의 형식이 호환되지 않습니다.
'T' 형식은 'number' 형식에 할당할 수 없습니다.
```

분명 제네릭 타입으로 잘 추론을 해줄 것으로 생각했는데
왜 에러가 나는지 한참 고민하다 AI에게 질문해서 해답을 얻을 수 있었다.

### **문제 원인**

내가 작성한 `type WithLogging = <T>(cb: T) => T`는
콜백 함수 자체가 제네릭이어야 한다는 의미였다.

하지만 `double`은 이미 `(x: number) => number`라는 구체적인 타입으로 고정된 함수였기 때문에 타입 불일치가 발생했다.

### **해결 방법**

```ts
const withLogging = <T>(cb: (a: T) => T)
```

호출할 때마다 타입이 달라질 수 있도록 작성하기 위해서는 제네릭을 함수 선언부에 작성해야 한다.

**2. 입력과 출력 타입이 다른 경우를 고려하지 못함**

**처음 구현:**

```typescript
export const withLogging = <T>(cb: (a: T) => T) => { ... }
```

입력과 출력의 타입이 반드시 같아야 한다.
만약 isEven과 같은 함수가 들어오면 입력은 number, 리턴은 boolean 타입이라 입력과 출력 타입이 달라지는 문제가 있다.

```ts
export const withLogging = <T, R>(cb: (a: T) => R) => { ... }
```

**러닝 포인트**

- 제네릭의 `<T>` 위치가 언제 타입이 결정되는가를 결정한다는 것이다.
  타입 별칭으로 선언한 경우에 cb가 제네릭 타입이어야 한다는 뜻이고, 함수 선언부가 제네릭인 경우엔 호출 시점에 타입을 결정한다는 것을 알게 되었다.

- 제네릭을 하나만 쓸 필요는 없다는 것이다. 제네릭 사용이 아직 미숙하다는 걸 다시금 깨달았다.
