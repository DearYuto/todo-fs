export function* range(start: number, end: number) {
  let i = start;
  while (i < end) {
    yield i++;
  }
}
