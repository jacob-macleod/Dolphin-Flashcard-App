// ets_tracing: off
import "../Operator/index.mjs";
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { identity } from "../Function/index.mjs";

function* genOf(a) {
  yield a;
}

function* genMap(iterator, mapping) {
  let n = -1;

  while (true) {
    const result = iterator.next();

    if (result.done) {
      break;
    }

    n += 1;
    yield mapping(result.value, n);
  }
}

function* genChain(iterator, mapping) {
  while (true) {
    const result = iterator.next();

    if (result.done) {
      break;
    }

    const ib = mapping(result.value)[Symbol.iterator]();

    while (true) {
      const result = ib.next();

      if (result.done) {
        break;
      }

      yield result.value;
    }
  }
} // inspired from "Closing Iterables is a Leaky Abstraction" by Reginald Braithwaite
// https://raganwald.com/2017/07/22/closing-iterables-is-a-leaky-abstraction.html


export function zipWith(iterableA, iterableB, zipper) {
  return {
    [Symbol.iterator]() {
      let done = false;
      const ia = iterableA[Symbol.iterator]();
      const ib = iterableB[Symbol.iterator]();
      return {
        next() {
          if (done) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.return();
          }

          const va = ia.next();
          const vb = ib.next();
          return va.done || vb.done ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.return() : {
            done: false,
            value: zipper(va.value, vb.value)
          };
        },

        return(value) {
          if (!done) {
            done = true;

            if (typeof ia.return === "function") {
              ia.return();
            }

            if (typeof ib.return === "function") {
              ib.return();
            }
          }

          return {
            done: true,
            value
          };
        }

      };
    }

  };
}
export function map(f) {
  return i => ({
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  });
}
export function map_(i, f) {
  return {
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  };
}
export function zip(fb) {
  return fa => zipWith(fa, fb, Tp.tuple);
}
export function zip_(fa, fb) {
  return zipWith(fa, fb, Tp.tuple);
}
export function chain(f) {
  return i => ({
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  });
}
export function chain_(i, f) {
  return {
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  };
}
export function ap(fa) {
  return fab => chain_(fab, f => map_(fa, f));
}
export function of(a) {
  return {
    [Symbol.iterator]: () => genOf(a)
  };
}
export function take_(a, n) {
  return {
    *[Symbol.iterator]() {
      let i = 0;

      for (const x of a) {
        if (i++ >= n) {
          return;
        }

        yield x;
      }
    }

  };
}
export function skip_(a, n) {
  return {
    *[Symbol.iterator]() {
      let i = 0;

      for (const x of a) {
        if (i++ >= n) {
          yield x;
        }
      }
    }

  };
}
export const never = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *[Symbol.iterator]() {}

};
export function foldMap(M) {
  return f => fa => {
    let res = M.empty;
    let n = -1;
    const iterator = fa[Symbol.iterator](); // eslint-disable-next-line no-constant-condition

    while (true) {
      const result = iterator.next();

      if (result.done) {
        break;
      }

      n += 1;
      res = M.concat(res, f(result.value, n));
    }

    return res;
  };
}
export function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}
export function reduce_(fa, b, f) {
  let res = b;
  let n = -1;
  const iterator = fa[Symbol.iterator](); // eslint-disable-next-line no-constant-condition

  while (true) {
    const result = iterator.next();

    if (result.done) {
      break;
    }

    n += 1;
    res = f(res, result.value, n);
  }

  return res;
}
export function reduceRight(b, f) {
  return fa => {
    return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i));
  };
}
export function reduceRight_(fa, b, f) {
  return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i));
}
export function concat(a, b) {
  return {
    *[Symbol.iterator]() {
      for (const x of a) {
        yield x;
      }

      for (const x of b) {
        yield x;
      }
    }

  };
}
export function flatten(a) {
  return chain_(a, identity);
}
export function partitionMap(f) {
  return as => A.separate(Array.from(map_(as, f)));
}
/**
 * Infinite sequence produced by repeated application of f to a
 */

export function unfold(a, f) {
  return {
    *[Symbol.iterator]() {
      yield a;
      let current = a;

      while (true) {
        current = f(a);
        yield current;
      }
    }

  };
}
export function corresponds(left, right, f) {
  const leftIt = left[Symbol.iterator]();
  const rightIt = right[Symbol.iterator](); // eslint-disable-next-line no-constant-condition

  while (1) {
    const lnext = leftIt.next();
    const rnext = rightIt.next();

    if (lnext.done !== rnext.done) {
      return false;
    }

    if (lnext.done) {
      return true;
    }

    if (!f(lnext.value, rnext.value)) {
      return false;
    }
  }

  throw new Error("Bug");
}
//# sourceMappingURL=index.mjs.map