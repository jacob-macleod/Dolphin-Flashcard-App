// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 */

export function fold(s) {
  return f => self => M.use_(foldWhileManagedM(s)(_ => true)((s, a) => T.succeed(f(s, a)))(self), T.succeed);
}
//# sourceMappingURL=fold.mjs.map