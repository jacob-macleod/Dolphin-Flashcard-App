// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import * as FM from "./foldM.mjs";
/**
 * Converts an option on errors into an option on values.
 */

export function unsome(self) {
  return FM.foldM_(self, O.fold(() => succeed(O.emptyOf()), fail), a => succeed(O.some(a)));
}
//# sourceMappingURL=unsome.mjs.map