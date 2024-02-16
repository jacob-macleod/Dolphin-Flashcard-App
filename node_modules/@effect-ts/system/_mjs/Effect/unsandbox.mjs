import { flatten } from "../Cause/index.mjs";
import { mapErrorCause_ } from "./mapErrorCause.mjs";
/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 */

export function unsandbox(fa, __trace) {
  return mapErrorCause_(fa, flatten, __trace);
}
//# sourceMappingURL=unsandbox.mjs.map