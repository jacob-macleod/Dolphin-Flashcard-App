// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../Function/index.mjs";
import { await as promiseAwait } from "../Promise/await.mjs";
import { make as promiseMake } from "../Promise/make.mjs";
import * as RefM from "../RefM/index.mjs";
import { fork, succeed } from "./core.mjs";
import * as Do from "./do.mjs";
import * as map from "./map.mjs";
import * as tap from "./tap.mjs";
import * as to from "./to.mjs";
/**
 * Returns a memoized version of the specified effectual function.
 */

export function memoize(f, __trace) {
  return map.map_(RefM.makeRefM(new Map()), ref => a => map.map_(Do.bind_(Do.bind_(Do.do, "promise", () => RefM.modify(m => {
    const memo = m.get(a);

    if (memo) {
      return succeed(Tp.tuple(memo, m));
    }

    return map.map_(tap.tap_(Do.bind_(Do.do, "promise", () => promiseMake()), ({
      promise
    }) => fork(to.to_(f(a), promise))), ({
      promise
    }) => Tp.tuple(promise, m.set(a, promise)));
  })(ref)), "b", ({
    promise
  }) => promiseAwait(promise)), ({
    b
  }) => b), __trace);
}
/**
 * Returns a memoized version of the specified effectual function.
 *
 * This variant uses the compare function to compare `A`
 */

export function memoizeEq(compare) {
  return f => map.map_(RefM.makeRefM(new Map()), ref => a => map.map_(Do.bind_(Do.bind_(Do.do, "promise", () => RefM.modify(m => {
    for (const [k, v] of m) {
      if (compare(k)(a)) {
        return succeed(Tp.tuple(v, m));
      }
    }

    return map.map_(tap.tap_(Do.bind_(Do.do, "promise", () => promiseMake()), ({
      promise
    }) => fork(to.to_(f(a), promise))), ({
      promise
    }) => Tp.tuple(promise, m.set(a, promise)));
  })(ref)), "b", ({
    promise
  }) => promiseAwait(promise)), ({
    b
  }) => b));
}
//# sourceMappingURL=memoize.mjs.map