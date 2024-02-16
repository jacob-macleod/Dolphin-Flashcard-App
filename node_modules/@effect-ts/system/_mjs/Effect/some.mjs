// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Converts an option on values into an option on errors.
 */

export function some(self, __trace) {
  return foldM_(self, e => fail(O.some(e)), O.fold(() => fail(O.none), succeed), __trace);
}
//# sourceMappingURL=some.mjs.map