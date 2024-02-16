import * as O from "../../../../Option/index.mjs";
import * as MapError from "./mapError.mjs";
import * as RightOrFail from "./rightOrFail.mjs";
/**
 * Fails with the error `None` if value is `Left`.
 */

export function right(self) {
  return RightOrFail.rightOrFail_(MapError.mapError_(self, O.some), () => O.none);
}
//# sourceMappingURL=right.mjs.map