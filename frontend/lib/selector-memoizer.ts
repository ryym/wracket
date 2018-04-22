// A memoizer. This allows memoized functions to access a whole state
// unlike reselect package (generally it should not allow that though).
export const memoize = <S, A extends {[key: string]: any}, R>(
  getArgs: (s: S) => A,
  select: (s: S, args: A) => R,
): ((s: S) => R) => {
  let initArgs: any = {};
  let prevArgs: A = initArgs;
  let cache: R | null = null;
  return state => {
    const args = getArgs(state);
    if (prevArgs === initArgs || Object.keys(args).some(key => args[key] !== prevArgs[key])) {
      cache = select(state, args);
      prevArgs = args;
    }
    return cache!;
  };
};
