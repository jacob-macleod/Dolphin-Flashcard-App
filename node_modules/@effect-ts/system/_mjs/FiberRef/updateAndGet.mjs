// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified function and returns
 * the result.
 */

export function updateAndGet(f) {
  return modify(v => {
    const result = f(v);
    return Tp.tuple(result, result);
  });
}
//# sourceMappingURL=updateAndGet.mjs.map