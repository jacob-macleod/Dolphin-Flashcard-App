// ets_tracing: off
import * as O from "../Option/index.mjs";
import { mapError_ } from "./mapError.mjs";
/**
 * Maps the error value of this effect to an optional value.
 */

export function asSomeError(self, __trace) {
  return mapError_(self, O.some, __trace);
}
//# sourceMappingURL=asSomeError.mjs.map