// ets_tracing: off
import { succeedWith } from "../Effect/core.mjs";
import { unsafeMake } from "./unsafeMake.mjs";
/**
 * Makes a new promise to be completed by the fiber with the specified id.
 */

export function makeAs(fiberId) {
  return succeedWith(() => unsafeMake(fiberId));
}
//# sourceMappingURL=makeAs.mjs.map