export function iter<T>(src: Iterable<T>): Iter<T> {
  return new Iter(src);
}

export class Iter<T> implements Iterable<T> {
  constructor(private readonly src: Iterable<T>) {}

  [Symbol.iterator]() {
    return this.src[Symbol.iterator]();
  }

  map<R>(f: (v: T) => R): Iter<R> {
    return new Iter(mapper(f, this.src));
  }

  filter(f: (v: T) => boolean): Iter<T> {
    return new Iter(filter(f, this.src));
  }

  take(n: number): Iter<T> {
    return new Iter(taker(n, this.src));
  }

  use<R = T>(converter: (a: Iter<T>) => Iter<R>): Iter<R> {
    return converter(this);
  }

  collect(): T[] {
    const xs = [];
    for (let v of this.src) {
      xs.push(v);
    }
    return xs;
  }
}

function* mapper<T, R>(f: (v: T) => R, src: Iterable<T>) {
  for (let v of src) {
    yield f(v);
  }
}

function* filter<T>(pred: (v: T) => boolean, src: Iterable<T>) {
  for (let v of src) {
    if (pred(v)) {
      yield v;
    }
  }
}

function* taker<T>(n: number, src: Iterable<T>) {
  let i = 0;
  for (let v of src) {
    if (i === n) {
      break;
    }
    i += 1;
    yield v;
  }
}
