// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { getOrElse_ } from "../Option/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified partial function.
 * If the function is undefined on the current value it returns the old value
 * without changing it.
 */

export function updateSomeAndGet(f) {
  return modify(v => {
    const result = getOrElse_(f(v), () => v);
    return Tp.tuple(result, result);
  });
}
//# sourceMappingURL=updateSomeAndGet.mjs.map