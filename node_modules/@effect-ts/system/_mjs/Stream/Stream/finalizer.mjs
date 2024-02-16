// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { bracket_ } from "./bracket.mjs";
/**
 * Creates a one-element stream that never fails and executes the finalizer when it ends.
 */

export function finalizer(finalizer) {
  return bracket_(T.unit, _ => finalizer);
}
//# sourceMappingURL=finalizer.mjs.map