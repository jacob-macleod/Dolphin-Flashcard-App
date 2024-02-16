// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */

export function refineOrDieWith_(self, pf, f) {
  return new C.Stream(CH.catchAll_(self.channel, e => O.fold_(pf(e), () => CH.failCause(CS.die(f(e))), e1 => CH.fail(e1))));
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */

export function refineOrDieWith(pf, f) {
  return self => refineOrDieWith_(self, pf, f);
}
//# sourceMappingURL=refineOrDieWith.mjs.map