import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchAllCause_(self, f) {
  const channel = CH.catchAllCause_(self.channel, _ => f(_).channel);
  return new C.Stream(channel);
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 *
 * @ets_data_first catchAllCause_
 */

export function catchAllCause(f) {
  return self => catchAllCause_(self, f);
}
//# sourceMappingURL=catchAllCause.mjs.map