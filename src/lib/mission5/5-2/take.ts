/**
 * 1차 구현 시도
 */
export function* take<T>(iterable: Generator<T, void, unknown>, n: number) {
  while (n--) {
    yield iterable.next().value;
  }
}
