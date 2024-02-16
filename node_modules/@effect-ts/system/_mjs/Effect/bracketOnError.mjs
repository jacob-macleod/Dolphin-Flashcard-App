import { bracketExit_ } from "./bracketExit.mjs";
import { unit } from "./core.mjs";
/**
 * Executes the release effect only if there was an error.
 *
 * @ets_data_first bracketOnError_
 */

export function bracketOnError(use, release, __trace) {
  return acquire => bracketOnError_(acquire, use, release, __trace);
}
/**
 * Executes the release effect only if there was an error.
 */

export function bracketOnError_(acquire, use, release, __trace) {
  return bracketExit_(acquire, use, (a, e) => e._tag === "Success" ? unit : release(a, e), __trace);
}
//# sourceMappingURL=bracketOnError.mjs.map