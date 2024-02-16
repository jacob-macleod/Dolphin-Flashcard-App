// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as fromEffect from "../Managed/fromEffect.mjs";
import * as api from "./api.mjs";
/**
 * Creates a new `XRef` with the specified value.
 */

export function makeManagedRef(a) {
  return fromEffect.fromEffect(api.makeRef(a));
}
//# sourceMappingURL=makeManagedRef.mjs.map