// ets_tracing: off
import { identity, pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { catchAll_ } from "./catchAll.mjs";
import { die } from "./die.mjs";
import { fail } from "./fail.mjs";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */

export function refineOrDieWith(pf, f, __trace) {
  return self => refineOrDieWith_(self, pf, f, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */

export function refineOrDieWith_(self, pf, f, __trace) {
  return catchAll_(self, e => O.fold_(pf(e), () => die(f(e)), e1 => fail(e1)), __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */

export function refineOrDie(pf, __trace) {
  return self => refineOrDie_(self, pf, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */

export function refineOrDie_(self, pf, __trace) {
  return refineOrDieWith_(self, pf, identity, __trace);
}
//# sourceMappingURL=refineOrDie.mjs.map