// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { getOrElse_ } from "../Option/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified partial function.
 * If the function is undefined on the current value it doesn't change it.
 */

export function updateSome(f) {
  return modify(v => Tp.tuple(undefined, getOrElse_(f(v), () => v)));
}
//# sourceMappingURL=updateSome.mjs.map