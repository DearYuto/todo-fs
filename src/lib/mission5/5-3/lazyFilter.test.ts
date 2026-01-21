import { describe, expect, test, vi } from 'vitest';
import { lazyFilter } from './lazyFilter';

describe('lazyFilter 함수 테스트', () => {
  test('predicate가 true인 요소만 yield 한다.', () => {
    const testCases = [
      {
        name: '유토',
        job: 'engineer',
      },
      {
        name: '무토',
        job: 'developer',
      },
      {
        name: '유',
        job: 'developer',
      },
    ] as const;
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
  });

  test('비어있는 이터러블인 경우 결과 값도 비어 있어야 한다.', () => {
    const input: Array<unknown> = [];

    const result = lazyFilter(input, () => true);

    expect([...result]).toEqual([]);
  });

  test('비어있는 이터러블인 경우 즉시 종료되어야 한다.', () => {
    const input: unknown[] = [];
    const result = lazyFilter(input, () => true);
    const iterator = result[Symbol.iterator]();

    expect(iterator.next()).toEqual({
      done: true,
      value: undefined,
    });
  });

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
});
