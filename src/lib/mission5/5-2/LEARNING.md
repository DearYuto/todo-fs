## take 함수 구현 학습 기록

```ts
구현 조건
- take(iterable, n) 형태의 제너레이터 함수를 구현합니다.
- iterable에서 최대 n개의 요소만 가져옵니다.
- 원본 iterable이 무한하더라도 n개만 생성합니다.
- 제너레이터로 구현해 메모리 효율적이어야 합니다.

// 실행 예시
const numbers = range(1, Infinity); // 무한 수열
const first5 = [...take(numbers, 5)];
console.log(first5); // [1, 2, 3, 4, 5]

```

### take 구현 과정

> **첫 구현 시 어려웠던 점**

iterable의 타입을 무엇으로 해야하지?
뭔가 Iterable이라는 타입이 있을 것 같았는데.. 하고 직감만 믿고 사용했었다.
하지만, 출력 결과가 원하는 대로 안 나왔다.

그렇다면 value를 직접 뽑아서 써야하는건가? 하고 next()를 호출하려고 했더니 next 함수가 없다고 에러가 나왔다.

next()를 호출하려면 Generator여야 하나? 싶어서 타입을 수정했다.

내부에서 next 호출을 해야 value를 꺼낼 수 있으니 다음과 같은 방식으로 1차 구현을 했다.
다른 것보다(타이핑 빼고..) 실행 예제의 정답 출력이 나오는데 집중했다.

```ts
/**
 * 1차 구현 시도
 */
export function* take<T>(iterable: Generator<T, void, unknown>, n: number) {
  while (n--) {
    yield iterable.next().value;
  }
}
```

미션의 실행 예시는 동작했지만, 확신이 없어서 AI에게 리뷰를 요청했다.

이 코드는 다음과 같은 문제가 있다는 리뷰를 받았다.

> **❌ 발견된 문제점**

**1. 타입의 확장성이 낮다.**

Generator 타입으로 제한해서 Map, Set, String 같은 일반적인 이터러블 객체를 지원하지 못했다.

**2. 원본 이터러블이 n보다 작다면 undefined가 채워지는 문제가 있었다.**

```ts
const numbers = range(1, 2);
const first5 = [...take(numbers, 5)];

console.log(first5); //  [1, undefined, undefined, undefined, undefined]
```

undefined로 채워지는 문제는 전혀 생각하지 못했던 부분이었다.

AI에게 첫 피드백을 받고 다음과 같이 수정해보았다.

---

### 2차 구현

제일 처음 생각했던 방향인 Iterable로 인자 타입을 변경했다.
또, AI에게 힌트로 받았던 for-of 순회로 yield하는 방식으로 작성해보았다.

```ts
/**
 * 2차 구현 시도
 * 이터러블(array, string, map, set) 지원이 안돼서 다시 구현
 */
export function* take2<T>(iterable: Iterable<T>, n: number) {
  for (const i of iterable) {
    if (n--) yield i;

    if (n <= 0) break;
  }
}
```

n이 0이되는 시점엔 yield되면 안되니 `n--`로 작성했다.
새로운 변수 선언 안하고 if문 조건 처리 후에 값을 감소 시켜야겠다는 의도로코테 풀듯이 썼었다.

이 부분에 대해서 다음과 같이 AI가 피드백을 줬다.

```ts
if (n--) yield i;
```

> **AI 리뷰 조언 #1 - 가독성 문제**

- 조건문 안에서 `n--`를 쓰는 건 `C 스타일 트릭`이에요. 동작하지만 읽는 사람이 "n을 검사하면서 동시에 감소?"를 머릿속으로 시뮬레이션해야 함
- 의도가 명확하지 않음.

이 코드에 대한 리뷰는 대체적으로 공감하는 편이다.

if(n)도 아니고, if(n--)이라 읽을 때 직관적이지 않을 수 있을 것 같았다.

두가지 일처리를 짧게 치려고 해서 가독성이 떨어지니까..ㅠㅠ

> **AI 리뷰 조언 #2 - 로직 분산**

- yield 조건(if (n--))과 종료 조건(if (n <= 0))이 분리되어 있어서 흐름 파악이 어려워요.

응집도 측면에서 분리되어 있는 부분이 읽기 어려웠다고 한다.

이에 대해서 다음과 같은 `개선 코드`를 받아볼 수 있었다.

```ts
export function* take<T>(iterable: Iterable<T>, n: number): Generator<T> {
  let count = 0;

  for (const item of iterable) {
    if (count >= n) return;
    yield item;
    count++;
  }
}
```

count 변수 선언으로 가독성을 개선했고 n보다 count값이 같거나 클 때 종료하겠다는 조건도 처음에 명시되어 있었다.

> **배운점 및 회고**

항상 알고있어도 실천하기 어려운 건 역시 `의도가 드러나는 좋은 코드를 작성하자`라는 걸 다시 한번 느꼈다.

최근 클린코드 관련한 아티클을 읽었었는데 한글의 띄어쓰기를 지키는 것만으로도 가독성이 비약적으로 상승하듯, 코드 역시 읽는 사람을 배려해야한다는 늬앙스의 내용이었다. 이번 미션에서 AI 리뷰를 통해 다시 그 의미를 체감할 수 있었다.

나만 아는 효율적인 코드보다 누구나 이해할 수 있는 친절한 코드를 작성하도록 노력해야겠다.

또, 이번 미션에서는 테스트 코드를 작성하려고 노력했다.
비록 모든 엣지케이스를 완벽히 커버하진 못했지만 테스트 코드를 고민하는 과정 자체가 함수형 프로그래밍 원리를 이해하는 데 조금 더 도움이 됐다.

함수형 프로그래밍 감각을 잘 익혀봐야겠다.!
