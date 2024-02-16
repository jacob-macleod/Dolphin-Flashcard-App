// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunReduceWhileManagedEffect from "./runReduceWhileManagedEffect.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 */

export function runReduceWhileEffect_(self, s, cont, f) {
  return M.use_(RunReduceWhileManagedEffect.runReduceWhileManagedEffect_(self, s, cont, f), T.succeed);
}
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhileEffect_
 */

export function runReduceWhileEffect(s, cont, f) {
  return self => runReduceWhileEffect_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhileEffect.mjs.map