import * as O from "../../Option/index.mjs";
import { mapError_ } from "./mapError.mjs";
import { rightOrFail_ } from "./rightOrFail.mjs";
/**
 * Fails with the error `None` if value is `Left`.
 */

export function right(self) {
  return rightOrFail_(mapError_(self, O.some), O.none);
}
//# sourceMappingURL=right.mjs.map