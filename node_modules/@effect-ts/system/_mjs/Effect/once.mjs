// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import { getAndSet, makeRef } from "../Ref/index.mjs";
import * as map from "./map.mjs";
import { whenM_ } from "./whenM.mjs";
/**
 * Returns an effect that will be executed at most once, even if it is
 * evaluated multiple times.
 */

export function once(self, __trace) {
  return map.map_(makeRef(true), r => whenM_(self, getAndSet(false)(r)), __trace);
}
//# sourceMappingURL=once.mjs.map