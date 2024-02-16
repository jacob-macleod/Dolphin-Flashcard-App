// ets_tracing: off
import { chain_, succeed } from "./core.mjs";
/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 *
 * @ets_data_first repeatWhileM_
 */

export function repeatWhileM(f, __trace) {
  return self => repeatWhileM_(self, f, __trace);
}
/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 */

export function repeatWhileM_(self, f, __trace) {
  return chain_(self, a => chain_(f(a), b => b ? repeatWhileM_(self, f) : succeed(a)), __trace);
}
/**
 * Repeats this effect while its error satisfies the specified predicate.
 *
 * @ets_data_first repeatWhile_
 */

export function repeatWhile(f, __trace) {
  return self => repeatWhile_(self, f, __trace);
}
/**
 * Repeats this effect while its error satisfies the specified predicate.
 */

export function repeatWhile_(self, f, __trace) {
  return repeatWhileM_(self, a => succeed(f(a)), __trace);
}
//# sourceMappingURL=repeatWhile.mjs.map