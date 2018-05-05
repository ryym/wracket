export const updateObj = <O extends {}, K extends keyof O>(
  obj: O,
  key: K,
  update: (v: O[K]) => O[K],
): O => {
  const cur = obj[key];
  const next = update(cur);
  // https://github.com/Microsoft/TypeScript/issues/13557
  return cur === next ? obj : {...(obj as any), [key]: next};
};

export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (o, key) => {
      o[key] = obj[key];
      return o;
    },
    {} as Pick<T, K>,
  );
};
