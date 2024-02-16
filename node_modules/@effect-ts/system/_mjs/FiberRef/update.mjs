// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { modify_ } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified function.
 *
 * @ets_data_first update_
 */

export function update(f) {
  return self => update_(self, f);
}
/**
 * Atomically modifies the `FiberRef` with the specified function.
 */

export function update_(self, f) {
  return modify_(self, v => Tp.tuple(undefined, f(v)));
}
//# sourceMappingURL=update.mjs.map