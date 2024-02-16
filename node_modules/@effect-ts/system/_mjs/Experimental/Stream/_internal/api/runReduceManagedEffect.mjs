import * as RunReduceWhileManagedEffect from "./runReduceWhileManagedEffect.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */

export function runReduceManagedEffect_(self, s, f) {
  return RunReduceWhileManagedEffect.runReduceWhileManagedEffect_(self, s, _ => true, f);
}
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 *
 * @ets_data_first runReduceManagedEffect_
 */

export function runReduceManagedEffect(s, f) {
  return self => runReduceManagedEffect_(self, s, f);
}
//# sourceMappingURL=runReduceManagedEffect.mjs.map