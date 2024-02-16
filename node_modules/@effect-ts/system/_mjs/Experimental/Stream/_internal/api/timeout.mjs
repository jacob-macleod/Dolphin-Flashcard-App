import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as FromPull from "./fromPull.mjs";
import * as ToPull from "./toPull.mjs";
/**
 * Ends the stream if it does not produce a value after d duration.
 */

export function timeout_(self, d) {
  return FromPull.fromPull(M.map_(ToPull.toPull(self), pull => T.timeoutFail_(pull, d, () => O.none)));
}
/**
 * Ends the stream if it does not produce a value after d duration.
 *
 * @ets_data_first timeout_
 */

export function timeout(d) {
  return self => timeout_(self, d);
}
//# sourceMappingURL=timeout.mjs.map