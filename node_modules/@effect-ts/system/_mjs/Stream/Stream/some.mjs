// ets_tracing: off
import * as O from "../../Option/index.mjs";
import { mapError_ } from "./mapError.mjs";
import { someOrFail_ } from "./someOrFail.mjs";
/**
 * Converts an option on values into an option on errors.
 */

export function some(self) {
  return someOrFail_(mapError_(self, O.some), () => O.none);
}
//# sourceMappingURL=some.mjs.map