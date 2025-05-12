interface IsEven {
  (n: number): boolean;
}

export const isEven: IsEven = (n) => n % 2 === 0;
