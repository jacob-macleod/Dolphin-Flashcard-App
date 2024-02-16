// ets_tracing: off
import { succeed, tryOrElse_ } from "./core.mjs";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */

export function orElse_(self, that, __trace) {
  return tryOrElse_(self, that, succeed, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */

export function orElse(that, __trace) {
  return self => orElse_(self, that, __trace);
}
//# sourceMappingURL=orElse.mjs.map