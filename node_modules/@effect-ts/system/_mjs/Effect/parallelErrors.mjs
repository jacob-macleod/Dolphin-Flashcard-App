import { failures } from "../Cause/index.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Exposes all parallel errors in a single call
 */

export function parallelErrors(self, __trace) {
  return foldCauseM_(self, cause => {
    const f = failures(cause);

    if (f.length === 0) {
      return halt(cause);
    } else {
      return fail(f);
    }
  }, succeed, __trace);
}
//# sourceMappingURL=parallelErrors.mjs.map