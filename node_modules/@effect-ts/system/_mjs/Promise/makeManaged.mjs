// ets_tracing: off
import { chain_ } from "../Effect/core.mjs";
import { fiberId } from "../Effect/fiberId.mjs";
import { toManaged } from "../Effect/index.mjs";
import { makeAs } from "./makeAs.mjs";
/**
 * Makes a new managed promise to be completed by the fiber creating the promise.
 */

export function makeManaged() {
  return toManaged(chain_(fiberId, id => makeAs(id)));
}
//# sourceMappingURL=makeManaged.mjs.map