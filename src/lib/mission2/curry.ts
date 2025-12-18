type Curry<P extends unknown[], R> = P extends [infer First, ...infer Rest]
  ? (arg: First) => Rest extends [] ? R : Curry<Rest, R>
  : R;

export const curry = <P extends unknown[], R>(
  fn: (...args: P) => R
): Curry<P, R> => {
  return function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn(...(args as P));
    }

    return (...nextArgs: unknown[]) => {
      return curried(...args, ...nextArgs);
    };
  } as Curry<P, R>;
};
