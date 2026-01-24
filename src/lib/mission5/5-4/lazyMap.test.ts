import { describe, expect, test, vi } from 'vitest';
import { lazyMap } from './lazyMap';
import { range } from '../5-1/range';
import { lazyFilter } from '../5-3/lazyFilter';
import { take } from '../5-2/take';

describe('lazyMap 함수 테스트', () => {
  test('각 요소에 fn을 적용한 결과가 반환되어야 한다.', () => {
    const input = [1, 2, 3, 4, 5];
    const fn = (n: number) => n * 2;
    const expectedResults = [2, 4, 6, 8, 10];

    expect([...lazyMap(input, fn)]).toStrictEqual(expectedResults);
  });

  test('구현 조건 실행 예시와 같은 결과 값을 출력해야한다.', () => {
    const numbers = range(1, 100);
    const doubled = lazyMap(numbers, (n) => n * 2);
    const filtered = lazyFilter(doubled, (n) => n % 3 === 0);
    const expectedResults = [6, 12, 18, 24, 30];

    expect([...take(filtered, 5)]).toStrictEqual(expectedResults);
  });

  test('지연평가 되어야 한다.', () => {
    const spyFn = vi.fn((n) => n);
    const input = [1, 2, 3];
    const generator = lazyMap(input, spyFn);

    const iter = generator[Symbol.iterator]();
    expect(spyFn).toBeCalledTimes(0);

    iter.next();
    expect(spyFn).toBeCalledTimes(1);

    iter.next();
    iter.next();
    expect(spyFn).toBeCalledTimes(3);
  });

  test('빈 이터러블이 들어오면 즉시 종료되어야 한다.', () => {
    const input: unknown[] = [];
    const generator = lazyMap(input, () => {});
    const iter = generator[Symbol.iterator]();

    expect(iter.next()).toStrictEqual({ done: true, value: undefined });
  });
});
