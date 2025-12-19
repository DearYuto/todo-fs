export const withLogging = <T, R>(cb: (a: T) => R) => {
  return (input: T) => {
    console.log(`[before] ${input}`);

    const result = cb(input);

    console.log(`[after] ${result}`);

    return result;
  };
};
