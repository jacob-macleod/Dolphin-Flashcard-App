import * as SK from "../../Sink/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */

export function runReduceWhileManaged_(self, s, cont, f) {
  return RunManaged.runManaged_(self, SK.reduce(s, cont, f));
}
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runFoldWhileManaged_
 */

export function runReduceWhileManaged(s, cont, f) {
  return self => runReduceWhileManaged_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhileManaged.mjs.map