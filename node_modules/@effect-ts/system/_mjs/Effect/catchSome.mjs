// ets_tracing: off
import * as C from "../Cause/index.mjs";
import * as E from "../Either/core.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/core.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */

export function catchSome(f, __trace) {
  return fa => catchSome_(fa, f, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */

export function catchSome_(fa, f, __trace) {
  return foldCauseM_(fa, cause => E.fold_(C.failureOrCause(cause), x => O.getOrElse_(f(x), () => halt(cause)), halt), succeed, __trace);
}
//# sourceMappingURL=catchSome.mjs.map