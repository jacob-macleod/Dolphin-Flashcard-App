import { chain_ } from "../core.mjs";
import { fromEither } from "./fromEither.mjs";
/**
 * Submerges the error case of an `Either` into the `Managed`. The inverse
 * operation of `Managed.either`.
 */

export function absolve(self, __trace) {
  return chain_(self, fromEither, __trace);
}
//# sourceMappingURL=absolve.mjs.map