export function* lazyFilter<T>(
  iterable: Iterable<T>,
  predicate: (target: T) => boolean
) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}
