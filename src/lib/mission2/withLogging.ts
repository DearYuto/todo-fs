export const withLogging = <T>(fn: (item: T) => T) => {
  return (item: T) => {
    console.log(`[before] ${item}`);

    const result = fn(item);

    console.log(`[after] ${result}`);

    return result;
  };
};
