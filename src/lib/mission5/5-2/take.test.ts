import { describe, expect, it } from 'vitest';
import { take2 } from './take';
import { range } from '../5-1/range';

describe('take 함수 테스트', () => {
  describe('무한 수열 테스트', () => {
    const results = [
      [1, [1]],
      [2, [1, 2]],
      [3, [1, 2, 3]],
      [4, [1, 2, 3, 4]],
      [5, [1, 2, 3, 4, 5]],
    ] as const;

    it.each(results)(
      '무한 수열에서 %i개를 가져오면 %j가 된다.',
      (count, expected) => {
        const numbers = range(1, Infinity);

        expect([...take2(numbers, count)]).toEqual(expected);
      }
    );
  });

  describe('원본이 작은 경우 테스트', () => {
    const results = [
      [5, [1, 2]],
      [100, [1, 2]],
    ] as const;

    it.each(results)(
      '원본이 %i보다 작으면 가져올 수 있는 만큼만 가져온다.',
      (count, expected) => {
        expect([...take2([1, 2], count)]).toEqual(expected);
      }
    );
  });

  describe('다른 이터러블 타입 테스트', () => {
    it('String 타입일 때도 정상 동작한다.', () => {
      const input = '배고픈 유토';
      const result = ['배', '고', '픈'];

      expect([...take2(input, 3)]).toEqual(result);
    });

    it('Set 타입일 때도 정상 동작한다.', () => {
      const input = new Set(['유토', '개발자']);
      const result = ['유토'];

      expect([...take2(input, 1)]).toEqual(result);
    });

    it('Map 타입일 때도 정상 동작한다.', () => {
      const input = new Map([
        ['name', '유토'],
        ['job', 'developer'],
      ]);
      const result = [['name', '유토']];

      expect([...take2(input, 1)]).toEqual(result);
    });
  });
});
