// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Converts an option on errors into an option on values.
 */

export function option(self, __trace) {
  return foldM_(self, () => succeed(O.none), a => succeed(O.some(a)), __trace);
}
//# sourceMappingURL=option.mjs.map