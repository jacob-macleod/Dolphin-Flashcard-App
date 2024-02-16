// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as MapError from "./mapError.mjs";
import * as SomeOrFail from "./someOrFail.mjs";
/**
 * Converts an option on values into an option on errors.
 */

export function some(self) {
  return SomeOrFail.someOrFail_(MapError.mapError_(self, O.some), () => O.none);
}
//# sourceMappingURL=some.mjs.map