export const memoize = <R>(f: () => R): (() => R) => {
  let cache: R;
  let cached = false;
  return () => {
    if (!cached) {
      cache = f();
      cached = true;
    }
    return cache;
  };
};
