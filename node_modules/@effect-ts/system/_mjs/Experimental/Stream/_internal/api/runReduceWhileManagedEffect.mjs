import * as SK from "../../Sink/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */

export function runReduceWhileManagedEffect_(self, s, cont, f) {
  return RunManaged.runManaged_(self, SK.reduceEffect(s, cont, f));
}
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */

export function runReduceWhileManagedEffect(s, cont, f) {
  return self => runReduceWhileManagedEffect_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhileManagedEffect.mjs.map