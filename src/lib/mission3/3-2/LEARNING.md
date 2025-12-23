## updateAt 함수 구현 학습 기록

```ts
구현 조건
- updateAt(array, index, updateFn) 형태로 동작합니다.
- updateFn은 현재 값을 받아 새 값을 반환합니다.
- 원본 배열을 변경하지 않고 새 배열을 반환합니다.
- 잘못된 인덱스는 에러를 던지지 않고 원본을 반환합니다.

// 실행 예시
const numbers = [1, 2, 3, 4, 5];
const updated = updateAt(numbers, 2, (n) => n * 10);
console.log(updated); // [1, 2, 30, 4, 5]
console.log(numbers); // [1, 2, 3, 4, 5]
```

### 풀이 과정

3-1 미션이 어려웠어서 오늘은 더 어렵겠지 생각했는데 다행히 배열 문제라 수월하게 풀 수 있었다.

괜히 쫄아서 문제 풀기 전에 주석부터 달고 시작했는데..ㅎㅎ

### AI 코드 리뷰

클로드에게 같은 문제를 줬더니 클로드는 이 문제를 `map`을 사용해서 풀었다.

```ts
// Claude 방식 - map 사용
array.map((item, i) => (i === index ? updateFn(item) : item));

// 내 방식 - spread + 직접 할당
const newArray = [...array];
newArray[index] = updateFn(newArray[index]);
```

`map`이 조금 더 선언적이고, 내 방식은 명령형에 가깝다는 피드백을 받았다.

팀 컨벤션에 따라 선택하면 된다고.
제미나이에게도 리뷰를 받았는데, 개인적으로 클로드보다 제미나이 답변이 더 도움이 됐다.

## 제미나이에게 받은 리뷰

```
✅ 잘한 점 (Good Points)
정확한 예외 처리 (Boundary Check)

if (index < 0 || array.length <= index)

인덱스가 음수이거나 배열의 길이보다 크거나 같을 때(즉, 존재하지 않는 인덱스일 때) 원본을 그대로 반환하는 로직이 완벽합니다.

불변성 보장 (Immutability)

const newArray = [...array];

전개 연산자(Spread Operator)를 사용하여 원본 배열을 수정하지 않고 얕은 복사본을 만든 점이 표준적이고 좋습니다.

제네릭 활용 (Generics)

<V>를 사용하여 어떤 타입의 배열이 들어오더라도 타입 추론이 깨지지 않도록 잘 작성했습니다.

💡 더 나은 코드를 위한 제안 (Suggestions)
현재 코드도 흠잡을 곳 없이 훌륭하지만, 최신 문법이나 가독성 측면에서 알아두면 좋은 팁들을 소개합니다.

1. (참고) 최신 문법: Array.prototype.with() (ES2023)
   최신 JavaScript/TypeScript 환경(Node 20+, 최신 브라우저)에서는 배열을 복사하고 특정 인덱스만 수정한 새 배열을 반환하는 with() 메서드가 표준으로 추가되었습니다.

이것을 사용하면 코드가 한 줄로 줄어듭니다. (다만, 아직 구형 브라우저 지원이 필요하다면 작성하신 방식이 더 안전합니다.)
```

### Array.with() 적용

`with` 메서드는 예전에 어렴풋이 들었던 기억이 있었는데 잊고 있었다. 제미나이 덕분에 다시 상기하게 됐다.

```ts
const updateAt = (array: V[], index: number, updateFn: (n: V) => V): V[] => {
  if (index < 0 || array.length <= index) return array;

  return array.with(index, updateFn(array[index]));
};
```

`이 인덱스를 이 값으로 바꾼 새 배열`이라는 의도가 명확하게 드러났다.
확실히 with을 사용하니 더 선언적인 코드라는 느낌을 받을 수 있었다.

### 오늘 배운 것

- **Array.with(index, value)**: ES2023에 추가된 메서드. 특정 인덱스의 값을 교체한 새 배열을 반환한다.
- **선언형 vs 명령형**: `with`은 "무엇을" 원하는지 표현하고, `spread + 할당`은 "어떻게" 하는지 표현한다.
