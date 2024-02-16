// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Converts an option on errors into an option on values.
 */

export function optional(self, __trace) {
  return foldM_(self, O.fold(() => succeed(O.none), fail), a => succeed(O.some(a)), __trace);
}
//# sourceMappingURL=optional.mjs.map