// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @param cont function which defines the early termination condition
 */

export function foldWhileM(s) {
  return cont => f => self => M.use_(foldWhileManagedM(s)(cont)(f)(self), T.succeed);
}
//# sourceMappingURL=foldWhileM.mjs.map