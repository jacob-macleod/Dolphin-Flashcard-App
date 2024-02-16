// ets_tracing: off
import * as E from "../Either/index.mjs";
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns a successful effect if the value is `Right`, or fails with the error `None`.
 */

export function right(self, __trace) {
  return foldM_(self, e => fail(O.some(e)), E.fold(() => fail(O.none), succeed), __trace);
}
//# sourceMappingURL=right.mjs.map