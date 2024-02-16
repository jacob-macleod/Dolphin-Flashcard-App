// ets_tracing: off
import { chain_ } from "../core.mjs";
import { succeed } from "../succeed.mjs";
import { suspend } from "./suspend.mjs";
/**
 * Iterates with the specified effectual function. The moral equivalent of:
 *
 * ```
 * let s = initial
 *
 * while (cont(s)) {
 *   s = body(s)
 * }
 *
 * return s
 * ```
 */

export function iterate(initial) {
  return cont => (body, __trace) => suspend(() => {
    if (cont(initial)) {
      return chain_(body(initial), z2 => iterate(z2)(cont)(body));
    }

    return succeed(initial);
  }, __trace);
}
//# sourceMappingURL=iterate.mjs.map