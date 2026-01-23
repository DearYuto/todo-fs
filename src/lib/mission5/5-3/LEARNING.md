## lazyFilter 함수 구현 학습 기록

```ts
구현 조건
- lazyFilter(iterable, predicate) 형태의 제너레이터 함수를 구현합니다.
- predicate가 true인 요소만 yield합니다.
- 배열을 미리 만들지 않고 필요할 때마다 평가합니다.
- 다른 제너레이터와 체이닝 가능해야 합니다.

// 실행 예시
const evens = lazyFilter(range(1, 100), (n) => n % 2 === 0);
const first5Evens = [...take(evens, 5)];
console.log(first5Evens); // [2, 4, 6, 8, 10]

```

## 문제 구현

```ts
export function* lazyFilter<T>(
  iterable: Iterable<T>,
  predicate: (target: T) => boolean
) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}
```

문제가 어렵진 않았던 편이라 구현은 쉽게 할 수 있었다.
다만 테스트 코드를 작성할 때 다소 난해한 부분이 있었다.

### 테스트 작성 시 고민했던 부분

```ts
  test('predicate가 true인 요소만 yield 한다.', () => {
```

predicate가 true인 요소만 yield하는 테스트에서 `spread 연산자 문법을 사용해 이터레이터를 모두 소진시키는 방식`으로 첫 테스트를 구성했었다.

```ts
const result = lazyFilter(testCases, (user) => user.job === 'developer');

expect([...result]).toEqual([
  {
    name: '무토',
    job: 'developer',
  },
  {
    name: '유',
    job: 'developer',
  },
]);
```

**이 테스트 코드가 문제될 수 있는 부분**

- result가 만약 무한 스트림으로 들어오는 상황이었다면 브라우저가 멈췄을거다..ㅎㅎ
- Array.prototype.filter와 차이가 없다. (이 테스트가 지연 평가를 테스트하는 건 아니긴 하지만)

lazyFilter의 지연 평가 되는건 어떤 방식으로 테스트를 해야하는거지?하는 부분에서 고민이 필요했다.

AI의 도움을 받아서 지연 평가에 대한 테스트는 어떤 방식으로 하는 게 적절한지 알 수 있었다.

## 지연 평가 테스트 방법

predicate의 호출 시점과 횟수를 추적하는 방법으로 지연 평가를 테스트할 수 있었다.

```ts
test('지연(lazy) 평가되어 실행되어야 한다.', () => {
  const input = [1, 2, 3, 4, 5];

  const isEven = vi.fn((n: number) => n % 2 === 0);

  const result = lazyFilter(input, isEven);
  const iterator = result[Symbol.iterator]();

  // 아직 next() 호출 전이라 실행되면 안됨
  expect(isEven).not.toHaveBeenCalled();

  const first = iterator.next();
  expect(first.value).toBe(2);
  expect(isEven).toHaveBeenCalledTimes(2);

  const second = iterator.next();
  expect(second.value).toBe(4);
  expect(isEven).toHaveBeenCalledTimes(4);
});
```

`vi.fn()`으로 predicate 함수를 모킹하여 호출 횟수를 추적할 수 있도록 했다.

또, `next()`를 호출할 때마다 필요한 만큼만 평가되는지 확인하는 방식으로 지연 평가를 테스트했다.

## 배운점 및 회고

스프레드 문법으로 일반 filter 함수 테스트하듯 최종 결과를 확인하다가 문득 지연 평가..?는 어떻게하는거지!하는데서 어려움이 있었지만

vi.fn을 사용해서 실행 메커니즘을 검증하는 방법을 배울 수 있는 계기가 됐다.

지연 평가의 매력을 조금씩 알아가고 있다. 한번에 메모리를 왕창 만들어서 실행하지 않아도 필요한 만큼만 쓸 수 있다는 게 참 매력적인 것 같다.
