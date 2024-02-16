// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as C from "../core.mjs";
export function foldChannel_(self, onErr, onSucc) {
  return C.foldCauseChannel_(self, _ => {
    return E.fold_(CS.failureOrCause(_), err => onErr(err), cause => C.failCause(cause));
  }, onSucc);
}
/**
 * @ets_data_first foldChannel_
 */

export function foldChannel(onErr, onSucc) {
  return self => foldChannel_(self, onErr, onSucc);
}
//# sourceMappingURL=foldChannel.mjs.map