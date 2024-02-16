// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunReduceWhileManagedEffect from "./runReduceWhileManagedEffect.mjs";
/**
 * Executes an effectful fold over the stream of values.
 */

export function runReduceEffect_(self, s, f) {
  return M.use_(RunReduceWhileManagedEffect.runReduceWhileManagedEffect_(self, s, _ => true, f), T.succeed);
}
/**
 * Executes an effectful fold over the stream of values.
 *
 * @ets_data_first runReduceEffect_
 */

export function runReduceEffect(s, f) {
  return self => runReduceEffect_(self, s, f);
}
//# sourceMappingURL=runReduceEffect.mjs.map