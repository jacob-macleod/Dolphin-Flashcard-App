// ets_tracing: off
import { map_ as mapCause } from "../Cause/index.mjs";
import * as O from "../Option/index.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Returns a successful effect with the head of the list if the list is
 * non-empty or fails with the error `None` if the list is empty.
 */

export function head(self, __trace) {
  return foldCauseM_(self, x => halt(mapCause(x, O.some)), x => {
    const it = x[Symbol.iterator]();
    const next = it.next();
    return next.done ? fail(O.none) : succeed(next.value);
  }, __trace);
}
//# sourceMappingURL=head.mjs.map