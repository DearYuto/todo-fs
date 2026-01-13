## groupBy 함수 구현 학습 기록

> 미션 개요

- Array.prototype.reduce 메서드를 사용하여 groupBy 함수를 구현한다.
- 구현 조건은 아래 사항을 따른다.

```ts
구현 조건
- groupBy(array, keyFn) 형태로 동작합니다.
- keyFn으로 각 요소의 키를 추출해 그룹화합니다.
- 결과는 { [key]: [items] } 형태의 객체입니다.
- reduce를 사용해 구현하세요.

// 실행 예시
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const grouped = groupBy(users, (user) => user.age);
console.log(grouped);
// {
//   25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }]
// }
```

### 최종 구현 코드

미션에서는 객체를 기준으로 내준 것 같은데 Map 자료구조를 사용하는 방법으로도
풀어볼 수 있을 것 같아서 두 가지 버전으로 구현해보았다.

```ts
/**
 * Map 사용해서 풀이
 */
export const groupByMap = <T, K>(array: Array<T>, keyFn: (target: T) => K) => {
  return array.reduce<Map<K, T[]>>((acc, cur) => {
    const key = keyFn(cur);

    if (acc.has(key) && Array.isArray(acc.get(key))) {
      const target = acc.get(key);
      target?.push(cur);
    } else {
      acc.set(key, [{ ...cur }]);
    }

    return acc;
  }, new Map());
};

/**
 * 객체 사용해서 풀이
 */
export const groupBy = <T>(
  array: Array<T>,
  keyFn: (target: T) => PropertyKey
) => {
  // PropertyKey 타입은 AI에게 리뷰 받은 후 수정했다. 기존은 string으로 작성했음.
  return array.reduce<Record<PropertyKey, T[]>>((acc, cur) => {
    const key = keyFn(cur);
    if (acc[key] && Array.isArray(acc[key])) {
      acc[key].push(cur);
    } else {
      acc[key] = [{ ...cur }];
    }

    return acc;
  }, {});
};
```

## 러닝포인트

이번 미션은 지난 미션들보다 배운 점이 많았다.

평소에 객체를 주로 사용하다보니 Map 문법에서 살짝 헷갈렸었던 부분이 있었다.
예를 들면, 일반 객체에 값을 저장할 때 obj[key] = value 형태를 사용한다면
Map 자료구조에서는 set 을 사용해야되는데(has는 기억났지만 set을 잊어버린..) 객체와 같은 형태의 문법을 사용했다가 에러를 만났었다. ㅋㅋ

재미있었던 건 두 가지(map, 일반 객체)로 풀어볼 수 있다는 점에서 Map을 사용했을 때와
일반 객체를 사용했을 때의 타이핑을 고민해볼 수 있었다.

### 1. string 대신 PropertyKey

객체 형태로 구현할 때 처음에는 키 타입을 `string`으로 정의했지만, 예제 코드에서의 key가 숫자 타입이었기 때문에(age) 타입 에러가 발생하는 문제가 있었다.

이때 타입스크립트의 내장 타입인 `PropertyKey` 를 사용하면 string | number | symbol을 모두 포함하고 있어 깔끔하고 안전하게 객체의 키 타입을 정의할 수 있다는 것을 알게 됐다.

### 2. 새로 알게된 문법 `??=`

if-else문으로 없으면 빈 배열에 값을 넣어주는 다음과 같은 형태로 작성했었다.

```ts
if (acc[key] && Array.isArray(acc[key])) {
    acc[key].push(cur);
} else {
    acc[key] = [{ ...cur }];
}
}
```

놀랍게도 이 if-else 구문은 다음과 같은 형태로 깔끔하게 단축할 수 있었다.

```ts
(acc[key] ??= []).push(cur);
```

### 3. 성능 최적화 (has와 get을 함께 쓰지 말고 get 후에 체크하기)

Map 자료구조로 구현한 내 코드는 다음과 같은 비효율 문제가 있었다.

```ts
 if (acc.has(key) && Array.isArray(acc.get(key))) {
```

has로 존재 여부를 확인 후에 get으로 array 타입인지 여부를 확인하는 코드이다.

이 코드는 get한 결과를 변수에 담아서 undefined 여부만 체크하면 탐색 횟수를 O(1)로 줄일 수 있다는 점을 알게 됐다.

```ts
const group = acc.get(key);

    if (group) {
        // ...
```

### 4. Lodash 라이브러리에서의 표준 구현은 원본 객체의 참조를 그대로 유지한다.

그룹화 과정에서 요소들을 {...cur}로 복사하여 안전하게 처리하려 했으나, Lodash와 같은 표준 라이브러리는원본 객체의 참조를 그대로 유지한다고 한다. (AI 피셜)

### 5. 잊고 있었던 유틸리티 타입! Record

인덱스 시그니처인 {[key: string]: T[]} 형식을 고민하다가 Record<K, T>를 사용하니 코드가 훨씬 직관적으로 변했다.

복잡한 제네릭 상황일수록 타입스크립트가 제공하는 유틸리티 타입을 적극 활용하는 것이 생산성에 큰 도움이 됨을 다시금 느꼈다.

## 회고

평소에 AI 자동완성을 너무 쉽게 간편하게 사용하고 있었는데 미션 문제 풀때만큼은 모든 AI의 자동완성을 끄고 코딩하니 알고 있었던 지식도 휘발돼서 기억이 안나는 것들이 있었다.

당연히 알고 있다고 믿었던 개념들이 기억나지 않아 당황하기도 했지만, 오히려 그 덕분에 부족한 부분을 정확히 파악하고 지식을 견고히 다질 수 있었다.

최근엔 고민없이 AI한테 문제 해결하라고 던져주는 것들로 인해 내가 바보가 되어가는 느낌이었는데 확실히 옛날에 공부하던 느낌이 나서 더 재미있었다.

AI를 잘 쓰는 것도 중요한 능력이지만, 역시 코딩의 묘미는 스스로 충분히 고민하고 해결책을 찾아가는 과정에서 오는 성취감인 것 같다.

비록 조금(많이..?일지도 모르겠지만ㅋㅋ) 느리고 투박하더라도 직접 문제를 해결하며 얻는 즐거움이 코딩의 진짜 매력이라는 것을 다시금 느꼈다.
