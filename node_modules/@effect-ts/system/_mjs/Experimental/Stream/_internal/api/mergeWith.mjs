// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as MH from "../../Channel/_internal/mergeHelpers.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Map from "./map.mjs";
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */

export function mergeWith(self, that, l, r, strategy = "Both") {
  const handler = terminate => exit => {
    if (terminate || !Ex.succeeded(exit)) {
      return MH.done(T.done(exit));
    } else {
      return MH.await_(T.done);
    }
  };

  return new C.Stream(CH.mergeWith_(Map.map_(self, l).channel, Map.map_(that, r).channel, handler(strategy === "Either" || strategy === "Left"), handler(strategy === "Either" || strategy === "Right")));
}
//# sourceMappingURL=mergeWith.mjs.map