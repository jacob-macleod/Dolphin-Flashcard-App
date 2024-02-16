"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ap = ap;
exports.chain = chain;
exports.chain_ = chain_;
exports.concat = concat;
exports.corresponds = corresponds;
exports.flatten = flatten;
exports.foldMap = foldMap;
exports.map = map;
exports.map_ = map_;
exports.never = void 0;
exports.of = of;
exports.partitionMap = partitionMap;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;
exports.reduce_ = reduce_;
exports.skip_ = skip_;
exports.take_ = take_;
exports.unfold = unfold;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zip_ = zip_;

require("../Operator/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
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


function zipWith(iterableA, iterableB, zipper) {
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

function map(f) {
  return i => ({
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  });
}

function map_(i, f) {
  return {
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  };
}

function zip(fb) {
  return fa => zipWith(fa, fb, Tp.tuple);
}

function zip_(fa, fb) {
  return zipWith(fa, fb, Tp.tuple);
}

function chain(f) {
  return i => ({
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  });
}

function chain_(i, f) {
  return {
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  };
}

function ap(fa) {
  return fab => chain_(fab, f => map_(fa, f));
}

function of(a) {
  return {
    [Symbol.iterator]: () => genOf(a)
  };
}

function take_(a, n) {
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

function skip_(a, n) {
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

const never = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *[Symbol.iterator]() {}

};
exports.never = never;

function foldMap(M) {
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

function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}

function reduce_(fa, b, f) {
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

function reduceRight(b, f) {
  return fa => {
    return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i));
  };
}

function reduceRight_(fa, b, f) {
  return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i));
}

function concat(a, b) {
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

function flatten(a) {
  return chain_(a, _index4.identity);
}

function partitionMap(f) {
  return as => A.separate(Array.from(map_(as, f)));
}
/**
 * Infinite sequence produced by repeated application of f to a
 */


function unfold(a, f) {
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

function corresponds(left, right, f) {
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
//# sourceMappingURL=index.js.map