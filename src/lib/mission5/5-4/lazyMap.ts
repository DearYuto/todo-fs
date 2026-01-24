export function* lazyMap<T, R>(iterable: Iterable<T>, fn: (item: T) => R) {
  for (const item of iterable) {
    yield fn(item);
  }
}
