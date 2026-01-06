## updateWhere 함수 구현 학습 기록

```ts
구현 조건
- updateWhere(collection, predicate, updateFn) 형태로 동작합니다.
- predicate는 조건 함수로, true를 반환하는 요소만 업데이트됩니다.
- 배열인 경우 모든 조건 만족 요소를 업데이트합니다.
- 원본은 변경하지 않습니다.

// 실행 예시
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

const updated = updateWhere(
  users,
  (user) => user.active,
  (user) => ({ ...user, name: user.name.toUpperCase() })
);
console.log(updated[0].name); // 'ALICE'
console.log(updated[1].name); // 'Bob' (active false이므로 변경 안됨)
```

### ❌ 1차 구현 및 문제점

구현 조건을 이해하는데 시간이 다소 소요됐다.

배열과 객체를 모두 지원해야한다는 점에서 중첩 객체도 포함되는건지 한참 고민하다가

predicate, updateFn 함수 예제를 보고 1뎁스 객체만 의미한다고 판단하고 구현했다.

```ts
const updateWhere = <T>(
  collection: object | T[],
  predicate: (v: T | object) => boolean,
  updateFn: (v: T | object) => T | object
) => {
  // 단일 객체인 경우
  if (typeof collection === 'object') {
    // predicate가 true일 때만 업데이트
    if (predicate(collection)) {
      return updateFn(collection);
    }
  }

  const newCollection = [...(collection as T[])];

  // 조건을 만족하는 요소만 업데이트
  return newCollection.map((c) => {
    if (predicate(c)) {
      return updateFn(c);
    }

    return c;
  });
};

export default updateWhere;
```

## 💥 트러블 슈팅 & 회고

1차로 구현한 로직엔 문제점이 많았다.

아는 내용이었음에도 제대로 구현하지 못했던 부분이 있어서 아쉬움이 크게 남았다.

먼저 AI가 작성해준 리뷰는 다음과 같다.

```
1. typeof collection === 'object'의 함정

JS에서 typeof []의 결과는 'object'입니다.

따라서 배열이 들어와도 첫 번째 if 문으로 들어가 버립니다.

다행히 predicate가 배열 자체에 대해 false라면 빠져나오겠지만, 논리적으로 위험한 구조입니다. 반드시 Array.isArray()를 먼저 체크해야 합니다.

2. 단일 객체일 때, 조건이 false면 에러 발생 (치명적)

만약 collection이 단일 객체이고 predicate가 false라면?

첫 번째 if 문을 빠져나와 아래의 [...collection] 코드를 실행합니다.

객체는 이터러블(iterable)이 아니므로 여기서 TypeError: collection is not iterable 에러가 발생하며 프로그램이 뻗습니다.

조건이 맞지 않으면 원본 collection을 그대로 리턴해줘야 합니다.

3. 배열 복사의 중복 (최적화)

[...collection].map(...)

map() 함수는 이미 새로운 배열을 반환합니다. 굳이 전개 연산자(...)로 복사본을 한 번 더 만들 필요가 없습니다. (메모리 낭비)
```

코드 리뷰를 통해 기본적이지만 치명적인 실수들을 발견할 수 있었다.

특히 잘못된 `typeof` 사용: object 타입을 가진 게 객체만 있는 것은 아니라는 걸 잘 알면서도 작성할 때 생각을 못했다.

버그긴 하지만 null도 object고 배열도 포함될텐데..ㅠㅠ 기본 원리인데도 실수했다는 점에서 이부분이 제일 아쉬웠다.

엣지 케이스에 대한 방어 로직도 부족했음을 알 수 있었다.

---

### 2차 구현 (받은 리뷰를 기준으로 로직 개선!)

AI에게 받은 피드백을 상기하며.. 다음날 다시 문제를 읽고 구현해보았다.

```ts
const updateWhere = <T>(
  collection: T | T[],
  predicate: (target: T) => boolean,
  updateFn: (target: T) => T | T[]
) => {
  if (Array.isArray(collection)) {
    return collection.map((collect) => {
      if (predicate(collect)) {
        return updateFn(collect);
      }
      return collect;
    });
  }

  return predicate(collection) ? updateFn(collection) : collection;
};
```

확실히 AI가 준 힌트 덕분에 조금 더 수월하게 문제를 풀 수 있었다.

한번 더 AI에게 리뷰를 받았는데 기능적으로는 정상동작하지만, 타입 안정성 관점에서 추가 피드백을 받을 수 있었다.

```
아주 훌륭합니다! 👏 이전 버전의 치명적인 문제(단일 객체에서의 에러)를 Array.isArray 로 완벽하게 해결하셨고, 로직도 훨씬 깔끔해졌습니다.

이제 기능적으로는 합격입니다. 다만, 타입스크립트(TypeSafety) 관점에서 딱 하나 위험한 부분이 있어서 그것만 다듬으면 완벽할 것 같습니다.

🔍 코드 리뷰 피드백
1. Good: 로직이 명확합니다.
Array.isArray를 최상단에 배치하여 배열과 단일 객체의 흐름을 명확히 분리한 점이 아주 좋습니다. map을 사용하여 불변성을 지킨 것도 훌륭합니다.

1. Bad: updateFn의 리턴 타입 정의 (T | T[])
작성하신 코드의 타입 정의를 보면:

TypeScript

updateFn: (target: T) => T | T[]
여기서 리턴 타입을 T | T[]로 하셨는데, 이는 배열(map)을 돌 때 문제가 될 수 있습니다.

상황: collection이 User[] (배열)입니다.

문제: map은 User 하나를 받아서 User 하나를 뱉어야 User[]가 유지됩니다. 만약 updateFn이 User[]를 리턴해버리면, 결과물은 User[][] (2차원 배열)이 되거나 타입 에러가 발생합니다.

수정: 업데이트 함수는 보통 입력받은 타입(T)과 동일한 형태를 반환해야 안전합니다.

3. Minor: 변수명 collect
map((collect) => ...) 에서 collect는 동사("수집하다")라서 변수명으로 조금 어색합니다. item, element, target 같은 명사를 추천합니다.
```

> 리뷰를 통해 알게된 점

- 리턴 타입의 모호함: updateFn이 T[]를 반환할 수 있는 경우, map 내부에서 2차원 배열이 되거나 타입 추론이 깨질 수 있다는 점
- 네이밍: collect는 동사라 변수명으로 부적절함. (collection이니까 짤라서 collect라고 썼는데 동사라는 걸 생각못했다...!)

## AI가 보완해준 코드

```ts
const updateWhere = <T>(
  collection: T | T[],
  predicate: (target: T) => boolean,
  updateFn: (target: T) => T // 👈 수정: 리턴 타입을 T로 고정 (구조 유지)
): T | T[] => {
  // 👈 추가: 함수의 리턴 타입 명시
  // 1. 배열인 경우
  if (Array.isArray(collection)) {
    return collection.map((item) => {
      if (predicate(item)) {
        return updateFn(item);
      }
      return item;
    });
  }

  // 2. 단일 객체인 경우 (타입 단언이 없어도 흐름상 T임이 보장됨)
  return predicate(collection as T) ? updateFn(collection as T) : collection;
};

export default updateWhere;
```
