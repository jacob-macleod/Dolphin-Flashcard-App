// ets_tracing: off
import { chain_ } from "../Effect/core.mjs";
import { fiberId } from "../Effect/fiberId.mjs";
import { makeAs } from "./makeAs.mjs";
/**
 * Makes a new promise to be completed by the fiber creating the promise.
 */

export function make() {
  return chain_(fiberId, id => makeAs(id));
}
//# sourceMappingURL=make.mjs.map