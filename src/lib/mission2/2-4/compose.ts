type AnyFunction = (...args: unknown[]) => unknown;

interface Compose {
  <A, B>(f: (arg: A) => B): (arg: A) => B;
  <A, B, C>(f: (arg: B) => C, g: (arg: A) => B): (arg: A) => C;
  <A, B, C, D>(
    f: (arg: C) => D,
    g: (arg: B) => C,
    h: (arg: A) => B
  ): (arg: A) => D;
  <A, B, C, D, E>(
    f: (arg: D) => E,
    g: (arg: C) => D,
    h: (arg: B) => C,
    i: (arg: A) => B
  ): (arg: A) => E;
  <A, B, C, D, E, F>(
    f: (arg: E) => F,
    g: (arg: D) => E,
    h: (arg: C) => D,
    i: (arg: B) => C,
    j: (arg: A) => B
  ): (arg: A) => F;
}
export const compose: Compose = (...fns: AnyFunction[]) => {
  return <V>(v: V) => fns.reduceRight((acc, cur) => cur(acc) as V, v);
};
