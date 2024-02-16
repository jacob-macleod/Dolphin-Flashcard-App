// ets_tracing: off
import * as O from "../Option/index.mjs";
import { fail, foldM_, succeed } from "./core.mjs";
/**
 * Converts an option on errors into an option on values.
 */

export function optional(self) {
  return foldM_(self, O.fold(() => succeed(O.none), fail), a => succeed(O.some(a)));
}
//# sourceMappingURL=optional.mjs.map