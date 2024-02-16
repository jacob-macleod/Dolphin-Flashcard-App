// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */

export function foldWhileManaged(s) {
  return cont => f => self => foldWhileManagedM(s)(cont)((s, a) => T.succeed(f(s, a)))(self);
}
//# sourceMappingURL=foldWhileManaged.mjs.map