/**
 * 1차 구현 시도
 */
export function* take<T>(iterable: Generator<T, void, unknown>, n: number) {
  while (n--) {
    yield iterable.next().value;
  }
}

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

/**
 * ai 리뷰 코드 - 클로드
 */
export function* takeClaude<T>(iterable: Iterable<T>, n: number): Generator<T> {
  let count = 0;

  for (const item of iterable) {
    if (count >= n) return;
    yield item;
    count++;
  }
}

/**
 * AI 리뷰 코드 - gemini3
 */

export function* takeGemini<T>(iterable: Iterable<T>, n: number): Generator<T> {
  if (n <= 0) return;

  let count = 0;
  for (const item of iterable) {
    yield item;
    count++;

    // n개에 도달하면 즉시 종료하여 이후의 이터러블 소비를 방지
    if (count >= n) break;
  }
}
