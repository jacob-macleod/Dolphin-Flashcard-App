import * as O from "../../../../Option/index.mjs";
import * as CatchAllCause from "./catchAllCause.mjs";
import * as FailCause from "./failCause.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchSomeCause_(self, pf) {
  return CatchAllCause.catchAllCause_(self, e => O.fold_(pf(e), () => FailCause.failCause(e), _ => _));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 *
 * @ets_data_first catchSomeCause_
 */

export function catchSomeCause(pf) {
  return self => catchSomeCause_(self, pf);
}
//# sourceMappingURL=catchSomeCause.mjs.map