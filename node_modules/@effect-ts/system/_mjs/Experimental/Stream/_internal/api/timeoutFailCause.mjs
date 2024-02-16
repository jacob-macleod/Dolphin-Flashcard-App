// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as FromPull from "./fromPull.mjs";
import * as ToPull from "./toPull.mjs";
/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 */

export function timeoutFailCause_(self, cause, d) {
  return FromPull.fromPull(M.map_(ToPull.toPull(self), pull => T.timeoutFailCause_(pull, () => CS.map_(cause, _ => O.some(_)), d)));
}
/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFailCause_
 */

export function timeoutFailCause(cause, d) {
  return self => timeoutFailCause_(self, cause, d);
}
//# sourceMappingURL=timeoutFailCause.mjs.map