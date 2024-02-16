// ets_tracing: off
import { chain_, succeed, suspend } from "./core.mjs";
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

export function iterate(initial, cont) {
  return (body, __trace) => {
    return suspend(() => {
      if (cont(initial)) {
        return chain_(body(initial), z2 => iterate(z2, cont)(body));
      }

      return succeed(initial);
    }, __trace);
  };
}
//# sourceMappingURL=iterate.mjs.map