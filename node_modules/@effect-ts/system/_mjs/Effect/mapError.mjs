// ets_tracing: off
import { map_ } from "../Cause/core.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 */

export function mapError_(self, f, __trace) {
  return foldCauseM_(self, c => halt(map_(c, f)), a => succeed(a), __trace);
}
/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 *
 * @ets_data_first mapError_
 */

export function mapError(f, __trace) {
  return self => mapError_(self, f, __trace);
}
//# sourceMappingURL=mapError.mjs.map