import * as RunReduceWhileManaged from "./runReduceWhileManaged.mjs";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */

export function runReduceManaged_(self, s, f) {
  return RunReduceWhileManaged.runReduceWhileManaged_(self, s, _ => true, (s, a) => f(s, a));
}
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 *
 * @ets_data_first runReduceManaged_
 */

export function runReduceManaged(s, f) {
  return self => runReduceManaged_(self, s, f);
}
//# sourceMappingURL=runReduceManaged.mjs.map