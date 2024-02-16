// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 */

export function foldWhile(s) {
  return cont => f => self => M.use_(foldWhileManagedM(s)(cont)((s, a) => T.succeed(f(s, a)))(self), T.succeed);
}
//# sourceMappingURL=foldWhile.mjs.map