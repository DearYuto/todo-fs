## mapWithReduce 함수 구현 학습 기록

> 미션 개요

- Array.prototype.reduce 메서드를 사용하여 map 함수를 구현한다.
- 구현 조건은 아래 사항을 따른다.

```ts
구현 조건
- Array.prototype.reduce를 사용해 map을 구현합니다.
- mapWithReduce(array, fn) 형태로 동작합니다.
- 원본 배열의 각 요소에 fn을 적용한 새 배열을 반환합니다.
- 제네릭을 사용해 타입 추론이 가능하도록 작성하세요.

// 실행 예시
const numbers = [1, 2, 3, 4, 5];
const doubled = mapWithReduce(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### 미션 구현 코드 및 트러블 슈팅

```ts
export const mapWithReduce = <T, R>(array: Array<T>, fn: (target: T) => R) => {
  return array.reduce((acc: R[], cur: T) => {
    const newValue = fn(cur);
    acc.push(newValue);
    return acc;
  }, []);
};
```

구현 자체는 어렵지 않았으나, reduce 내부 로직을 작성하는 과정에서 다음과 같은 런타임 에러를 겪었다.

### ❌ 런타임 에러 발생

```ts
export const mapWithReduce = <T, R>(array: Array<T>, fn: (target: T) => R) => {
  return array.reduce((acc: T[], cur: T) => {
    return acc.push(fn(cur));
  }, []);
};
```

**(참고) 위 코드는 타입스크립트 타이핑 에러가 발생한다. 구현 후 타이핑을 수정하려는 의도로 작성되었다.**

처음 생각했던 작성 방식은 reduce 내부에서 누적시킬 때 map의 동작 방식처럼 구현하면 될 테니
빈 배열에 누적값을 하나씩 push하려고 했었다.

> 에러 메시지: Uncaught TypeError: acc.push is not a function

**에러 원인 분석**

- Array.prototype.push 메서드는 변경된 배열 자체가 아니라 **새로운 배열의 길이(number)** 를 반환한다.

- 첫 번째 순회에서 acc.push()의 결과인 1(길이)이 반환되어 다음 acc로 전달된다.

- 두 번째 순회에서 숫자 1에 .push()를 호출하려 하니 TypeError가 발생한 것이다.

**해결**

- Array.push를 실행한 후 acc 배열 자체를 명시적으로 반환하도록 수정하여 해결했다.

### AI에게 받은 코드 리뷰 & 리팩토링

제출해주신 코드는 문제의 요구사항을 정확하게 파악하고 잘 구현하셨습니다! 👍 로직상으로는 map과 동일하게 동작하며, push를 사용해 성능도 잘 챙겼습니다.

몇 가지 타입스크립트 관점에서의 안전성과 코드 스타일 측면에서 보완하면 좋을 점들을 정리해 드립니다.

```ts
📝 코드 리뷰 포인트

1. reduce의 제네릭 타입 명시 (권장)
   현재 코드에서는 콜백 함수의 인자(acc: R[])에 타입을 지정하여 타입을 역으로 추론하게 했습니다. 하지만 더 명확하고 안전한 방법은 reduce 함수 자체에 제네릭을 명시하는 것입니다. 특히 초기값 []가 빈 배열일 때, 타입스크립트가 이를 never[]로 잘못 추론하는 경우를 방지할 수 있습니다.

2. 성능을 고려한 push 사용 (Good!)
   리액트나 함수형 프로그래밍을 공부하다 보면 불변성을 위해 return [...acc, newValue] 스프레드 연산자를 쓰는 경우가 많습니다. 하지만 reduce 안에서 스프레드를 쓰면 매 반복마다 배열을 복사하므로 시간 복잡도가 **O(N^2)**가 되어 성능이 매우 나빠집니다. 작성하신 것처럼 acc.push()를 사용하는 것이 O(N)으로 훨씬 효율적입니다. 아주 잘하셨습니다.

3. 인덱스(index)와 원본 배열(array) 인자 처리 (선택)
   실제 Array.prototype.map의 콜백 함수는 (item, index, array) 세 가지 인자를 받습니다. 완벽하게 map을 대체하려면 이 부분도 고려해볼 수 있습니다.

✅ 리팩토링 제안 코드
TypeScript

export const mapWithReduce = <T, R>(
array: T[],
fn: (item: T, index: number, array: T[]) => R // 표준 map처럼 index와 array도 받을 수 있게 확장
): R[] => {
return array.reduce<R[]>((acc, cur, index, originalArr) => {
// reduce 자체에 <R[]> 제네릭을 주어 초기값 []의 타입을 명확히 함
const newValue = fn(cur, index, originalArr);
acc.push(newValue);
return acc;
}, []);
};
💡 핵심 변경 사항 설명
array.reduce<R[]>(...):

reduce 메서드 바로 뒤에 제네릭 <R[]>을 붙여주었습니다. 이렇게 하면 초기값 []가 R[] 타입임을 컴파일러에게 확실하게 알려줍니다.

fn 시그니처 확장:

map 함수는 종종 인덱스가 필요할 때가 있습니다. (예: numbers.map((n, i) => i)). 이를 지원하기 위해 콜백 함수 타입을 확장했습니다.

🚫 주의: 성능 비교 (참고용)
혹시라도 "불변성을 지켜야 하지 않나?"라는 생각에 아래처럼 작성하면 절대 안 됩니다.

TypeScript

// ❌ 나쁜 예: 스프레드 연산자 사용 (성능 저하)
return array.reduce<R[]>((acc, cur) => {
return [...acc, fn(cur)]; // 배열이 커질수록 속도가 급격히 느려짐
}, []);

```

내부에서 스프레드 연산자를 사용하면 안된다는 추가 성능 저하 예시까지 알려줘서 좋았다.

부족했던 타입스크립쪽을 보완해서 코드를 작성하면 다음과 같은 형태가 될 것 같다. 여전히 어려운 TS ㅋㅋ

구현 조건은 문제처럼 구현했기 때문에 map의 index, array 인자는 제외했다.

### 최종 구현 코드

```ts
const mapWithReduce2 = <T, R>(array: Array<T>, fn: (target: T) => R) => {
  return array.reduce<R[]>((acc, cur) => {
    const newValue = fn(cur);
    acc.push(newValue);
    return acc;
  }, []);
};
```

기존에는 acc와 cur에 각각 인자 타입을 적어줬었는데

reduce<R[]> 로 선언해주면 타입스크립트 컴파일러가 reduce가 R타입 배열을 만들어낸다는 것을 명시해준다.

## 회고

간단한 로직이라 생각했지만 push의 반환값 같은 기초적인 부분에서 실수가 있었다.

push의 리턴 값을 고려하지 못했다는 점에서 역시 기본기가 중요하다는 걸 다시금 깨달았다.

또, AI 리뷰를 통해 타입스크립트의 제네릭 위치에 따라 타입 추론의 명확성이 달라진다는 점과 습관적인 스프레드 문법 사용이 성능 이슈를 야기할 수 있다는 점을 배울 수 있었다.

TS는 여전히 어렵지만..ㅎㅎ 이렇게 하나씩 잊고 있던 개념을 다시 상기한다거나 새로 배워가는 과정이 재미있었다.
