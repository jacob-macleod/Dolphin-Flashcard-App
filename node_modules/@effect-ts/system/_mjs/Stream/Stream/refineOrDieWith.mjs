// ets_tracing: off
import * as O from "../../Option/index.mjs";
import { catchAll_ } from "./catchAll.mjs";
import { die } from "./die.mjs";
import { fail } from "./fail.mjs";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */

export function refineOrDieWith(pf) {
  return f => self => catchAll_(self, err => O.fold_(pf(err), () => die(f(err)), _ => fail(_)));
}
//# sourceMappingURL=refineOrDieWith.mjs.map