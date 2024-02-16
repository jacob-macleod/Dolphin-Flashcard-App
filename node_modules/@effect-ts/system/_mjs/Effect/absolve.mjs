import { chain_ } from "./core.mjs";
import { fromEither } from "./fromEither.mjs";
/**
 * Returns an effect that submerges the error case of an `Either` into the
 * `Effect`.
 */

export function absolve(v, __trace) {
  return chain_(v, e => fromEither(() => e), __trace);
}
//# sourceMappingURL=absolve.mjs.map