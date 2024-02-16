// ets_tracing: off
import * as R from "../../Effect/runtime.mjs";
import { fromEffect } from "../fromEffect.mjs";
/**
 * Returns an Managed that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy
 * code that must call back into Effect code.
 */

export function runtime(__trace) {
  return fromEffect(R.runtime(), __trace);
}
//# sourceMappingURL=runtime.mjs.map