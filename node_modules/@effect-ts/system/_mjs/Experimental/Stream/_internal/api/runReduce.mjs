// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunReduceWhileManaged from "./runReduceWhileManaged.mjs";
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 */

export function runReduce_(self, s, f) {
  return M.use_(RunReduceWhileManaged.runReduceWhileManaged_(self, s, _ => true, (s, a) => f(s, a)), T.succeed);
}
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 *
 * @ets_data_first runReduce_
 */

export function runReduce(s, f) {
  return self => runReduce_(self, s, f);
}
//# sourceMappingURL=runReduce.mjs.map