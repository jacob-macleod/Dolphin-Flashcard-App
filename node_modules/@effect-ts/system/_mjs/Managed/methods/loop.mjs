// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import { chain_, map } from "../core.mjs";
import { succeed } from "../succeed.mjs";
import { unit } from "./api.mjs";
import { suspend } from "./suspend.mjs";
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
  return (body, __trace) => suspend(() => {
    if (cont(initial)) {
      return chain_(body(initial), a => map(as => [a, ...as])(loop(inc(initial), cont, inc)(body)));
    }

    return succeed([]);
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
  return (body, __trace) => suspend(() => {
    if (cont(initial)) {
      return chain_(body(initial), () => loopUnit(inc(initial), cont, inc)(body));
    }

    return unit;
  }, __trace);
}
//# sourceMappingURL=loop.mjs.map