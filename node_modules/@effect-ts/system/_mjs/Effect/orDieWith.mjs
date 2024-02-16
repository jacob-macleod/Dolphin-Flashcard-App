// ets_tracing: off
import { succeed } from "./core.mjs";
import { die } from "./die.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 *
 * @ets_data_first orDieWith_
 */

export function orDieWith(f, __trace) {
  return effect => orDieWith_(effect, f, __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */

export function orDieWith_(effect, f, __trace) {
  return foldM_(effect, e => die(f(e)), succeed, __trace);
}
//# sourceMappingURL=orDieWith.mjs.map