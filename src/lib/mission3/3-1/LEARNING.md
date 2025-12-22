## updateIn 함수 구현 학습 기록

```ts
구현 조건
- updateIn(obj, path, updateFn) 형태로 동작합니다.
- path는 문자열 배열로 접근 경로를 나타냅니다.
- updateFn은 현재 값을 받아 새 값을 반환하는 함수입니다.
- 중첩된 모든 객체를 불변으로 업데이트해야 합니다.
- App.tsx에서 깊은 객체 구조로 테스트하세요.

// 실행 예시
const user = {
  name: 'Alice',
  address: {
    city: 'Seoul',
    zipCode: '12345'
  }
};

const updated = updateIn(user, ['address', 'city'], () => 'Busan');
console.log(updated.address.city); // 'Busan'
console.log(user.address.city); // 'Seoul' (원본 유지)
```

### 구현 과정과 배운 점

> ### **1차 시도 (25.12.21) - 오브젝트인지 확인해서 중첩을 체크해보자!**

**[첫 시도 구현 방식]**

나름 타이핑도 처음부터 하려고 노력했다.

실행 예제를 기반으로 코드를 분석했을 때 다음과 같았다.

- 첫 번째 인자: 객체
- 두 번째 인자: 바꾸려고 하는 뎁스 (경로)
- 세 번째 인자: 바꾸려는 콜백함수

**[고민한 내용]**

1뎁스일 때는 단순 복사하고 값만 바꿔 보내면 되는데, 2뎁스 이상일 때 중첩해서 계속 들어가야 한다는 점이 어려웠다.

반복문으로 해결할 수 있을까 싶어서 path를 기준으로 반복문을 돌린다..!

`path`가 object의 `key`를 의미하니까 해당 타입이 객체인지 확인하고 맞다면

그 키 값의 value를 한번 더 updateIn 함수를 호출하는 재귀를 만들어서 값을 바꿔주면 되지 않을까?

고민한 내용을 기반으로 작성한 1차 시도 코드는 다음과 같다.

```ts
/* 1차 구현 코드 */
type Obj<T> = {
  [key: string]: T;
};

type UpdateFn<T> = (current: T) => T;

export const updateIn = <T>(
  obj: Obj<T>,
  path: string[],
  updateFn: UpdateFn<T>
) => {
  const newObj = { ...obj };

  for (let i = 0; i < path.length; i++) {
    const key = path[i];

    if (typeof newObj[key] === 'object') {
      newObj[key] = {
        ...updateIn(newObj[key], path.slice(i + 1), updateFn),
      };
      return newObj;
    } else {
      newObj[key] = updateFn();
    }
  }

  return newObj;
};
```

**무엇이 문제였나?**

- for 루프와 재귀의 혼용: 작성하는 내내 뭔가 이상하다고 느꼈지만 무엇이 문제인지 명확히 파악하지 못했다.
- 불필요한 복잡도: for 루프는 첫 번째 iteration에서 재귀 호출 후 바로 return하므로 의미가 없었다.
- 이중 스프레드: 재귀로 이미 새 객체를 반환하는데, 또 { ... }로 감싸서 불필요한 객체를 생성하고 있었다.

**1차 피드백 후 깨달은 점**

AI의 리뷰: "for 루프가 의미 없음. for loop 또는 재귀 둘 중 하나만 사용하세요"

정답 코드는 확인하지 않고, **"재귀만으로 해결해보자"**는 피드백만 기억한 채 다음 날 다시 시도하기로 했다.

깊은 복사에 재귀함수를 써야 된다는 개념을 분명 알고 있었는데, 막상 문제를 풀려니 재귀를 바로 떠올리지 못했다.

이론과 실전의 차이를 느꼈다.

> ### **(25.12.22) 2차 시도 - 재귀로 다시 도전!**

어제 받았던 힌트를 토대로 어려워서 잘 다루지 못하긴 하지만.. 재귀 함수만 사용해서 처리하려고 했다.

**[구현 접근 순서]**

- 기저 사례부터 정의하기: 무한 루프에 빠지면 안되기 때문에 `재귀를 언제 멈출 것인가?`부터 고민했다. path.length === 1일 때 값을 업데이트하고 종료하면 되겠다고 생각했다.

- 주석으로 로직 정리: 풀면서도 헷갈려서 console.log를 계속 썼다 지웠다 했는데, 주석으로 풀어야 하는 로직을 적어놓고 하나씩 해결하려고 했더니 일단은 원하는 결과가 나왔다.

- 타이핑은 잠시 보류: 주요 로직 구현에 집중했다.

```ts
/* 2차 구현 코드 */
export const updateIn = (obj, path, updateFn) => {
  let newObj = { ...obj };

  if (path.length === 1) {
    newObj = {
      ...newObj,
      [path[0]]: updateFn(),
    };

    return newObj;
  }

  // path가 1개이면
  // 현재 오브젝트에서 바로 바꿔서 리턴
  // path가 1개 초과이면
  // 재귀로 돌리는데 obj의 뎁스를 하나 줄여서 보내야함.

  const result = updateIn(obj[path[0]], path.slice(1), updateFn);

  return {
    ...obj,
    [path[0]]: result,
  };
};
```

타이핑도 없고 각 인자가 어떤 타입인지에 대한 예외 처리가 없다는 점에서 잘 짠 코드도 아닐 테지만..

고민 끝에 해결했다는 점에서 뿌듯했다.

## AI 리뷰 & 현실 체크

ㅋㅋㅋ씁쓸하지만 팩트로 두드려 맞았다.

```
✅ 그래도 동작은 함
우연히 동작하긴 하지만, 코드 품질이 낮아요:

읽기 어려움
유지보수 어려움
비효율적
문제 조건 위배 (updateFn에 현재 값 전달 안 함)

📊 점수

동작: 70/100 (updateFn 시그니처 문제, null 처리 없음)
가독성: 30/100 (for + 재귀 혼용, 이해 어려움)
효율성: 40/100 (불필요한 객체 생성)
유지보수성: 30/100 (로직 파악 어려움)

```

문제 조건을 내가 잘못 이해하고 있었나보다.

> updateFn은 현재 값을 받아 새 값을 반환하는 함수입니다.

updateFn()로 호출했어야 하는 게 아니라 updateFn(obj[path[0]])로 현재 값을 전달했어야 했다는 점을 모르고 있었다.

지금 다시 읽어봐도 문제에서 이걸 원하는 게 맞나..?하고 헷갈리긴 한다.

`그래도 동작은 함` 이 리뷰는 ㅋㅋㅋ 좋아해야 하는 건지 슬퍼해야 하는 건지...ㅠㅠ

```ts
type UpdateFn<T> = (current: T) => T;

export const updateIn = <T extends Record<string, unknown>>(
  obj: T,
  path: string[],
  updateFn: UpdateFn<unknown>
): T => {
  // 경로의 끝에 도달 - 값 업데이트
  if (path.length === 1) {
    return {
      ...obj,
      [path[0]]: updateFn(obj[path[0]]),
    };
  }

  // 중간 경로 - 재귀적으로 처리
  const [head, ...tail] = path;

  return {
    ...obj,
    [head]: updateIn(obj[head] as Record<string, unknown>, tail, updateFn),
  };
};
```

### 회고

이렇게 간단한 코드였다는데서 허무하기도 하고.. 그래도 큰 틀에서 어느정도 비슷하지 않냐는 위로를 건네본다..ㅠ

함수형 프로그래밍 참 어렵지만 고민하는 시간은 너무 재밌었다.

[head, ...tail]로 slice 안 쓰고 우아하게 처리한 부분에서 감탄했다.

포기하지 않고 다음 날 다시 도전해보니 어제보다 나은 코드가 나왔던 것 같다. 물론 AI한테 약간의 힌트를 받았던 게 컸겠지만.

타입 안정성까지 고려했다면 아마 아직까지도 제대로 못 짜고 헤매고 있었을 것 같다.

타입 안정성을 챙기기가 아직 익숙하지 않아서 아쉬웠다.
