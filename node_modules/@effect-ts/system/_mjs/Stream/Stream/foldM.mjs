// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes an effectful fold over the stream of values.
 */

export function foldM(s) {
  return f => self => M.use_(foldWhileManagedM(s)(_ => true)(f)(self), T.succeed);
}
//# sourceMappingURL=foldM.mjs.map