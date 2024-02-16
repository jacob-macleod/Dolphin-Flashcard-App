// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunReduceWhileManaged from "./runReduceWhileManaged.mjs";
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 */

export function runReduceWhile_(self, s, cont, f) {
  return M.use_(RunReduceWhileManaged.runReduceWhileManaged_(self, s, cont, (s, a) => f(s, a)), T.succeed);
}
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhile_
 */

export function runReduceWhile(s, cont, f) {
  return self => runReduceWhile_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhile.mjs.map