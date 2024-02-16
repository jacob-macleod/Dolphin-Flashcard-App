// ets_tracing: off
import * as L from "../Collections/Immutable/List/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as core from "./core.mjs";
import * as map from "./map.mjs";
/**
 * Loops with the specified effectual function, collecting the results into a
 * list. The moral equivalent of:
 *
 * ```
 * let s  = initial
 * let as = [] as readonly A[]
 *
 * while (cont(s)) {
 *   as = [body(s), ...as]
 *   s  = inc(s)
 * }
 *
 * A.reverse(as)
 * ```
 */

export function loop(initial, cont, inc) {
  return (body, __trace) => {
    return map.map_(loopInternal_(initial, cont, inc, body, __trace), x => Array.from(L.reverse(x)));
  };
}

function loopInternal_(initial, cont, inc, body, __trace) {
  return core.suspend(() => {
    if (cont(initial)) {
      return core.chain_(body(initial), a => map.map_(loopInternal_(inc(initial), cont, inc, body), as => {
        L.push_(as, a);
        return as;
      }));
    }

    return core.succeedWith(() => L.emptyPushable());
  }, __trace);
}
/**
 * Loops with the specified effectual function purely for its effects. The
 * moral equivalent of:
 *
 * ```
 * var s = initial
 *
 * while (cont(s)) {
 *   body(s)
 *   s = inc(s)
 * }
 * ```
 */


export function loopUnit(initial, cont, inc) {
  return (body, __trace) => {
    return core.suspend(() => {
      if (cont(initial)) {
        return core.chain_(body(initial), () => loopUnit(inc(initial), cont, inc)(body));
      }

      return core.unit;
    }, __trace);
  };
}
//# sourceMappingURL=loop.mjs.map