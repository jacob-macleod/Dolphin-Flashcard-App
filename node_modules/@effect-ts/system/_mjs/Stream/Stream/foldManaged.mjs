// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */

export function foldManaged(s) {
  return f => self => foldWhileManagedM(s)(_ => true)((s, a) => T.succeed(f(s, a)))(self);
}
//# sourceMappingURL=foldManaged.mjs.map