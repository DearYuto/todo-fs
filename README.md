## 함수형 프로그래밍 스터디

함수형 프로그래밍을 제대로 이해하고 싶어서 만든 학습 레포지토리입니다.

### 📚 스터디 방식

각 단계별 문제는 AI가 제시해주었습니다.

비록 혼자하는 스터디지만 재미와 몰입을 위해 다음과 같은 방식을 도입했습니다.

- **AI 자동완성 기능을 사용하지 않는다**  
  IDE의 AI 기능을 끄고 스스로 충분히 고민한 후 코드를 작성합니다.

- **충분히 고민한 후 질문한다**  
  막히는 부분이 있으면 바로 AI에게 물어보지 않습니다. 스스로 생각하고 탐색하는 시간을 충분히 가진 후 질문하거나 검색합니다.

- **학습 과정을 기록한다**  
  어려웠던 점, 삽질했던 부분, 깨달은 점을 `LEARNING.md`에 솔직하게 작성합니다.

### 🤔 왜 AI 자동완성을 끄고 하나요?

AI 자동완성은 분명 편리하고 생산성을 높여주는 좋은 도구입니다.
하지만 어느 순간부터 생각하고 고민하는 시간이 사라졌다는 걸 느꼈습니다.

AI를 잘 활용하는 것도 중요하지만, 모든 것을 AI에게 맡기기보다는 스스로 사고하는 습관을 유지하고 싶었습니다. 특히 학습 단계에서는 막히고 헤매는 과정 자체가 중요하다고 생각합니다.

물론 충분히 고민한 후에는 AI에게 질문하고 더 나은 방법을 배우고자 합니다.

## 1단계

### 🎯 목표

"입력 → 출력"만 존재하는 순수 함수를 직접 작성한다.

객체/배열을 직접 변경하지 않고 불변성을 유지하는 방법 습득한다.

자바스크립트 배열 함수인 map, filter, reduce를 함수형 스타일로 활용한다.

**미션1-1. 순수 함수 구현하기**

```
구현 조건
- 동일한 입력은 항상 동일한 출력을 가져야 함
- 외부 변수 사용 금지 (예: console.log, Math.random(), Date.now()는 X)
- 구현 사항은 App.tsx에 넣어서 결과확인하기.
```

- [x] add(a, b) → 두 수를 더해 결과를 반환 (부작용 없이)

- [x] multiply(a, b) → 곱셈 순수 함수

- [x] isEven(n) → 짝수인지 확인하는 순수 함수

**미션 1-2. 불변성 실습 (객체/배열)**

- [x] 객체를 직접 수정하지 않고, 새로운 객체로 반환

- [x] 원본 배열을 변경하지 않고 항목을 추가

**미션 1-3: map / filter / reduce 활용**

- [x] 숫자 배열에서 짝수만 필터링하고 제곱해서 합산

## 2단계

### 🎯 목표

함수를 인자로 받고, 함수를 반환하는 고차 함수(Higher-Order Function) 를 익힌다.

커링(currying), 함수 합성(pipe, compose) 개념을 이해하고 구현한다.

데이터 흐름을 함수로 연결하는 사고를 체화한다.

**미션2-1. 고차 함수 만들기**

- [x] 전후로 로그를 찍는 고차 함수 withLogging(fn) 작성

**✅ 완료 조건 체크리스트**

- [x] 인자를 받아 실행 전 [before] ... 로그 출력

- [x] 원래 함수 실행 후 [after] ... 로그 출력

- [x] 원래 함수의 반환값 그대로 반환

- [x] 제네릭을 사용해 여러 타입의 함수에 적용 가능하도록 작성

```ts
구현 조건
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

**미션2-2. 커링(Currying)**

- [x] 커링 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 인자가 하나씩 전달되도록 커링 구조로 변환

- [x] 모든 인자를 전달받으면 원래 함수 실행

- [x] 원래 함수와 동일한 결과 반환

- [ ] 제네릭 타입을 사용해 타입 안전하게 처리

```ts
구현 조건
- 다중 인자를 받는 함수를 커링 형태로 바꾸는 함수를 구현하세요.
- curry(fn)는 (a)(b)... 방식으로 원래 함수를 순차적으로 호출할 수 있게 합니다.
- 인자를 모두 전달받으면 원래 함수의 결과를 반환해야 합니다.
- 함수의 인자 개수는 최소 2개 이상이라고 가정합니다.
- App.tsx에서 테스트하여 결과를 확인하세요.

// 실행 예시

const sum = (a: number, b: number, c: number) => a + b + c;
const curriedSum = curry(sum);

const result = curriedSum(1)(2)(3);
console.log(result); // 6
```

**미션 2-3: pipe 함수 직접 구현**

- [x] pipe 함수 구현

✅ 완료 조건 체크리스트

- [x] 여러 함수를 왼쪽 → 오른쪽으로 순차적으로 실행

- [x] 마지막 함수의 반환값을 그대로 반환

- [ ] 타입 추론을 지원하는 제네릭 함수로 구현

```ts
구현 조건
- pipe(...fns)는 여러 함수를 왼쪽 → 오른쪽으로 순차적으로 실행하는 함수입니다.
- pipe(f, g, h)(x)는 h(g(f(x)))와 동일한 결과를 반환해야 합니다.
- 첫 번째 함수는 단일 인자를 받고, 이후 함수들도 이전 함수의 결과를 받아야 합니다.
- 제네릭 타입을 사용해 타입 추론이 가능하도록 구현해 보세요.
- App.tsx에서 테스트 코드를 실행해 확인하세요.

// 실행 예시

const add1 = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

const pipeline = pipe(add1, double, square);
console.log(pipeline(2)); // ((2 + 1) * 2)² = 36
```

**미션 2-4: compose 함수 직접 구현**

- [x] compose 함수 구현

✅ 완료 조건 체크리스트

- [x] 여러 함수를 오른쪽 → 왼쪽으로 순차적으로 실행

- [x] 마지막 함수의 반환값을 그대로 반환

- [ ] 제네릭을 사용해 타입 추론 가능하도록 구현

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

## 3단계

### 🎯 목표

상태 변경 로직을 순수 함수로 분리하여 함수형 스타일로 작성한다.

불변 업데이트 패턴을 깊은 객체 구조에 적용한다.

렌즈(Lens) 패턴의 기본 개념을 이해한다.

**미션 3-1: 불변 업데이트 헬퍼 함수 구현**

- [x] updateIn 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 중첩된 객체의 특정 경로를 업데이트
- [x] 원본 객체는 변경하지 않고 새 객체 반환
- [x] 경로는 배열 형태로 전달 (예: ['user', 'address', 'city'])
- [ ] 업데이트 함수를 인자로 받아 적용

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

**미션 3-2: 배열 업데이트 헬퍼**

- [x] updateAt 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 특정 인덱스의 배열 요소를 업데이트
- [x] 원본 배열은 변경하지 않음
- [x] 인덱스가 범위를 벗어나면 원본 반환

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

**미션 3-3: 조건부 업데이트**

- [x] updateWhere 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 조건을 만족하는 요소만 업데이트
- [x] 배열과 객체 모두 지원
- [x] 불변성 유지

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

---

## 4단계

### 🎯 목표

reduce를 활용한 데이터 변환 패턴을 익힌다.

transducer 개념의 기초를 이해한다.

함수형 사고로 복잡한 로직을 단순화한다.

**미션 4-1: reduce로 map 구현**

- [x] mapWithReduce 함수 구현

**✅ 완료 조건 체크리스트**

- [x] Array.prototype.reduce만 사용
- [x] 일반 map과 동일한 결과 반환
- [x] 타입 안전성 확보

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

**미션 4-2: reduce로 filter 구현**

- [x] filterWithReduce 함수 구현

**✅ 완료 조건 체크리스트**

- [x] Array.prototype.reduce만 사용
- [x] 일반 filter와 동일한 결과
- [x] 조건 함수를 인자로 받음

```ts
구현 조건
- Array.prototype.reduce를 사용해 filter를 구현합니다.
- filterWithReduce(array, predicate) 형태로 동작합니다.
- predicate가 true를 반환하는 요소만 포함한 배열을 반환합니다.

// 실행 예시
const numbers = [1, 2, 3, 4, 5, 6];
const evens = filterWithReduce(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]
```

**미션 4-3: groupBy 구현**

- [x] groupBy 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 키 추출 함수를 받아 그룹화
- [x] 객체 형태로 결과 반환
- [x] reduce를 활용

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

**미션 4-4: partition 구현**

- [x] partition 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 조건에 따라 배열을 둘로 분리
- [x] [true배열, false배열] 튜플 반환
- [x] reduce 활용

```ts
구현 조건
- partition(array, predicate) 형태로 동작합니다.
- predicate가 true인 요소와 false인 요소를 분리합니다.
- [통과한 요소들, 통과하지 못한 요소들] 형태의 튜플을 반환합니다.

// 실행 예시
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(odds);  // [1, 3, 5]
```

---

## 5단계

### 🎯 목표

게으른 평가(Lazy Evaluation) 개념을 이해한다.

제너레이터를 활용한 무한 스트림을 다룬다.

필요한 만큼만 계산하는 효율적인 코드를 작성한다.

**미션 5-1: 제너레이터로 range 구현**

- [x] range 제너레이터 함수 구현

**✅ 완료 조건 체크리스트**

- [x] function\* 문법 사용
- [x] start부터 end-1까지 숫자 생성
- [x] for...of로 순회 가능

```ts
구현 조건
- range(start, end) 형태의 제너레이터 함수를 구현합니다.
- start부터 end 전까지의 숫자를 순차적으로 yield합니다.
- 배열을 미리 만들지 않고 필요할 때마다 값을 생성합니다.
- for...of 문으로 순회 가능해야 합니다.

// 실행 예시
for (const n of range(1, 5)) {
  console.log(n); // 1, 2, 3, 4
}

// 배열로 변환
const arr = [...range(0, 10)];
console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**미션 5-2: take 구현**

- [x] take 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 이터러블에서 n개만 가져옴
- [x] 제너레이터로 구현
- [x] 무한 스트림에도 동작

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

**미션 5-3: filter 제너레이터 구현**

- [x] lazyFilter 함수 구현

**✅ 완료 조건 체크리스트**

- [x] 조건을 만족하는 요소만 yield
- [x] 제너레이터로 구현
- [x] 체이닝 가능

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

**미션 5-4: map 제너레이터 구현**

- [ ] lazyMap 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] 각 요소를 변환하여 yield
- [ ] 제너레이터로 구현
- [ ] 체이닝 가능

```ts
구현 조건
- lazyMap(iterable, fn) 형태의 제너레이터 함수를 구현합니다.
- 각 요소에 fn을 적용한 결과를 yield합니다.
- 필요할 때만 계산하도록 게으르게 동작합니다.

// 실행 예시
const numbers = range(1, 100);
const doubled = lazyMap(numbers, (n) => n * 2);
const filtered = lazyFilter(doubled, (n) => n % 3 === 0);
const result = [...take(filtered, 5)];
console.log(result); // [6, 12, 18, 24, 30]
```

---

## 6단계

### 🎯 목표

null/undefined를 안전하게 다루는 함수형 패턴을 익힌다.

Option(Maybe) 타입으로 값의 존재 여부를 표현한다.

Either 타입으로 성공/실패를 함수형으로 처리한다.

**미션 6-1: Option 타입 구현**

- [ ] Option 타입과 Some, None 구현

**✅ 완료 조건 체크리스트**

- [ ] Some(value)와 None 구분
- [ ] map, flatMap, getOrElse 메서드 구현
- [ ] null/undefined 체크를 Option으로 대체

```ts
구현 조건
- Option은 Some(값이 있음) 또는 None(값이 없음)을 표현하는 타입입니다.
- Some는 값을 감싸고, None은 값이 없음을 나타냅니다.
- map(fn): 값이 있으면 fn을 적용, 없으면 None 반환
- flatMap(fn): 값이 있으면 fn을 적용 (fn도 Option 반환), 없으면 None
- getOrElse(defaultValue): 값이 있으면 반환, 없으면 기본값 반환
- 타입 안전하게 구현하세요.

// 실행 예시
const some = Some(5);
const none = None;

console.log(some.map((n) => n * 2).getOrElse(0)); // 10
console.log(none.map((n) => n * 2).getOrElse(0)); // 0

// flatMap 예시
const getUserById = (id: number): Option => {
  return id === 1 ? Some({ name: 'Alice' }) : None;
};

const result = Some(1)
  .flatMap(getUserById)
  .map((user) => user.name)
  .getOrElse('Unknown');
console.log(result); // 'Alice'
```

**미션 6-2: Either 타입 구현**

- [ ] Either 타입과 Left, Right 구현

**✅ 완료 조건 체크리스트**

- [ ] Left(에러)와 Right(성공) 구분
- [ ] map, flatMap, fold 메서드 구현
- [ ] 에러 처리를 Either로 대체

```ts
구현 조건
- Either는 Left(실패) 또는 Right(성공)를 표현하는 타입입니다.
- Left는 에러를, Right는 성공 값을 감쌉니다.
- map(fn): Right일 때만 fn 적용, Left는 그대로 전달
- flatMap(fn): Right일 때 fn 적용 (fn도 Either 반환)
- fold(onLeft, onRight): 최종 결과를 추출 (Left면 onLeft, Right면 onRight)
- 타입 안전하게 구현하세요.

// 실행 예시
const divide = (a: number, b: number): Either => {
  return b === 0 ? Left('Division by zero') : Right(a / b);
};

const result1 = divide(10, 2)
  .map((n) => n * 2)
  .fold(
    (error) => `Error: ${error}`,
    (value) => `Success: ${value}`
  );
console.log(result1); // 'Success: 10'

const result2 = divide(10, 0)
  .map((n) => n * 2)
  .fold(
    (error) => `Error: ${error}`,
    (value) => `Success: ${value}`
  );
console.log(result2); // 'Error: Division by zero'
```

**미션 6-3: Option과 Either 활용**

- [ ] 실전 예제로 안전한 파싱 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] parseJSON을 Either로 감싸기
- [ ] 체이닝으로 안전한 데이터 추출
- [ ] try-catch 없이 에러 처리

```ts
구현 조건
- parseJSON(jsonString): Either 형태로 구현합니다.
- JSON 파싱 성공 시 Right, 실패 시 Left 반환
- 체이닝을 통해 안전하게 데이터를 추출합니다.
- try-catch를 함수 내부에서만 사용하고, 외부는 Either로 처리합니다.

// 실행 예시
const jsonString = '{"name": "Alice", "age": 25}';
const result = parseJSON(jsonString)
  .flatMap((obj) => {
    const data = obj as { name?: string; age?: number };
    return data.name ? Right(data.name) : Left(new Error('No name'));
  })
  .map((name) => name.toUpperCase())
  .fold(
    (error) => `Error: ${error.message}`,
    (name) => `Name: ${name}`
  );
console.log(result); // 'Name: ALICE'
```

---

## 7단계

### 🎯 목표

비동기 작업을 함수형으로 다루는 방법을 익힌다.

Promise를 함수 합성에 통합한다.

async/await를 함수형 스타일로 활용한다.

**미션 7-1: asyncPipe 구현**

- [ ] asyncPipe 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] Promise를 반환하는 함수들을 체이닝
- [ ] 왼쪽에서 오른쪽으로 실행
- [ ] 타입 추론 지원

```ts
구현 조건
- asyncPipe(...fns) 형태로 동작합니다.
- 각 함수는 Promise를 반환하거나 일반 값을 반환할 수 있습니다.
- 이전 함수의 결과를 다음 함수에 전달하며, await로 대기합니다.
- 최종 결과는 Promise로 감싸져 반환됩니다.

// 실행 예시
const fetchUser = async (id: number) => ({ id, name: 'Alice' });
const extractName = (user: { name: string }) => user.name;
const toUpperCase = (name: string) => name.toUpperCase();

const pipeline = asyncPipe(fetchUser, extractName, toUpperCase);
pipeline(1).then(console.log); // 'ALICE'
```

**미션 7-2: retry 함수 구현**

- [ ] retry 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] 실패 시 지정 횟수만큼 재시도
- [ ] 최종 실패 시 에러 throw
- [ ] 타임아웃 옵션 추가

```ts
구현 조건
- retry(fn, options) 형태로 동작합니다.
- fn은 Promise를 반환하는 비동기 함수입니다.
- options: { times: 재시도 횟수, delay: 재시도 간격(ms) }
- 성공할 때까지 재시도하며, 모두 실패하면 마지막 에러를 throw합니다.

// 실행 예시
let attempt = 0;
const unstableFetch = async () => {
  attempt++;
  if (attempt < 3) throw new Error('Failed');
  return 'Success';
};

const result = await retry(unstableFetch, { times: 5, delay: 100 });
console.log(result); // 'Success' (3번째 시도에 성공)
```

**미션 7-3: timeout 함수 구현**

- [ ] timeout 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] Promise에 타임아웃 적용
- [ ] 시간 초과 시 에러 발생
- [ ] 제네릭 타입 지원

```ts
구현 조건
- timeout(promise, ms) 형태로 동작합니다.
- promise가 ms 밀리초 안에 완료되지 않으면 에러를 throw합니다.
- 정상 완료되면 원래 Promise의 결과를 반환합니다.
- 제네릭을 사용해 타입 안전성을 확보하세요.

// 실행 예시
const slowTask = new Promise((resolve) => setTimeout(() => resolve('Done'), 2000));

try {
  await timeout(slowTask, 1000); // 1초 타임아웃
} catch (error) {
  console.log(error.message); // 'Timeout exceeded'
}
```

**미션 7-4: parallel 함수 구현**

- [ ] parallel 함수 구현

**✅ 완료 조건 체크리스트**

- [ ] 여러 Promise를 병렬 실행
- [ ] 모든 결과를 배열로 반환
- [ ] 하나라도 실패하면 전체 실패

```ts
구현 조건
- parallel(tasks) 형태로 동작합니다.
- tasks는 Promise를 반환하는 함수들의 배열입니다.
- 모든 함수를 동시에 실행하고, 모두 완료되면 결과 배열을 반환합니다.
- 하나라도 실패하면 즉시 에러를 throw합니다.
- Promise.all과 유사하지만 함수 배열을 받습니다.

// 실행 예시
const task1 = async () => 'Result 1';
const task2 = async () => 'Result 2';
const task3 = async () => 'Result 3';

const results = await parallel([task1, task2, task3]);
console.log(results); // ['Result 1', 'Result 2', 'Result 3']
```

---

## 8단계

### 🎯 목표

지금까지 배운 함수형 개념을 TodoApp에 통합한다.

상태 관리를 순수 함수로 구현한다.

UI 로직과 비즈니스 로직을 분리한다.

**미션 8-1: 함수형 상태 관리**

- [ ] 순수 함수로 Todo 상태 관리 구현

**✅ 완료 조건 체크리스트**

- [ ] addTodo, toggleTodo, deleteTodo를 순수 함수로 구현
- [ ] 불변 업데이트 적용
- [ ] pipe/compose로 복합 작업 처리

```ts
구현 조건
- Todo 타입: { id: number; text: string; completed: boolean }
- 모든 함수는 순수 함수여야 합니다 (원본 배열 변경 금지)
- addTodo(todos, text): 새 todo 추가
- toggleTodo(todos, id): 특정 todo의 completed 토글
- deleteTodo(todos, id): 특정 todo 삭제
- filterTodos(todos, filter): 'all' | 'active' | 'completed'에 따라 필터링
- 각 함수를 조합해 복잡한 작업 수행

// 실행 예시
let todos = [];
todos = addTodo(todos, 'Learn FP');
todos = addTodo(todos, 'Build TodoApp');
todos = toggleTodo(todos, 0);
console.log(filterTodos(todos, 'completed')); // [{ id: 0, text: 'Learn FP', completed: true }]
```

**미션 8-2: 함수형 UI 업데이트**

- [ ] 상태 변경을 선언적으로 처리

**✅ 완료 조건 체크리스트**

- [ ] useState를 함수형으로 업데이트
- [ ] 이벤트 핸들러를 순수 함수로 분리
- [ ] 상태 로직과 UI 로직 분리

```ts
구현 조건
- React의 useState를 사용하되, 업데이트 함수는 순수 함수로 작성합니다.
- 이벤트 핸들러는 순수 함수를 호출하기만 합니다.
- UI 컴포넌트는 상태를 받아서 렌더링만 담당합니다.
- 비즈니스 로직(todo 조작)과 UI 로직(렌더링)을 명확히 분리합니다.

// 실행 예시
const [todos, setTodos] = useState([]);

const handleAdd = (text: string) => {
  setTodos((prev) => addTodo(prev, text));
};

const handleToggle = (id: number) => {
  setTodos((prev) => toggleTodo(prev, id));
};
```

**미션 8-3: 비동기 작업 통합**

- [ ] API 호출을 함수형으로 처리

**✅ 완료 조건 체크리스트**

- [ ] asyncPipe로 데이터 흐름 관리
- [ ] Either로 에러 처리
- [ ] 로딩 상태를 함수형으로 관리

```ts
구현 조건
- fetchTodos(): Promise 형태의 API 함수를 작성합니다.
- asyncPipe를 사용해 데이터 흐름을 관리합니다.
- Either를 사용해 에러를 안전하게 처리합니다.
- 로딩/성공/실패 상태를 함수형으로 표현합니다.

// 실행 예시
const loadTodos = asyncPipe(
  fetchTodos,
  (todos) => todos.filter((t) => !t.completed),
  (todos) => todos.sort((a, b) => b.id - a.id)
);

loadTodos()
  .then((todos) => setTodos(todos))
  .catch((error) => console.error(error));
```

**미션 8-4: 최종 통합**

- [ ] 모든 개념을 TodoApp에 적용

**✅ 완료 조건 체크리스트**

- [ ] 순수 함수로 상태 관리
- [ ] pipe/compose로 복잡한 로직 처리
- [ ] Option/Either로 안전한 데이터 처리
- [ ] 제너레이터로 무한 스크롤 구현 (선택)

```ts
구현 조건
- 지금까지 학습한 모든 함수형 개념을 TodoApp에 통합합니다.
- 상태 관리는 순수 함수로만 처리합니다.
- 복잡한 로직은 pipe/compose로 조합합니다.
- null/undefined 체크는 Option으로 대체합니다.
- API 에러는 Either로 처리합니다.
- (선택) 무한 스크롤을 제너레이터로 구현해보세요.

// 평가 기준
- [ ] 모든 상태 업데이트가 순수 함수인가?
- [ ] 불변성이 모든 곳에서 유지되는가?
- [ ] 함수 조합이 적절히 사용되었는가?
- [ ] 타입 안전성이 확보되었는가?
- [ ] 코드가 선언적이고 읽기 쉬운가?
```
