// ets_tracing: off
import * as EQ from "../../../../Equal/index.mjs";
import * as ChangesWith from "./changesWith.mjs";
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using natural equality to determine whether two
 * elements are equal.
 */

export function changes(self) {
  return ChangesWith.changesWith_(self, EQ.strict());
}
//# sourceMappingURL=changes.mjs.map