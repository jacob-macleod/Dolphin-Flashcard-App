// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { access } from "./api.mjs";
/**
 * Returns an effectful function that merely swaps the elements in a `Tuple`.
 */

export function swap(__trace) {
  return access(({
    tuple: [a, b]
  }) => Tp.tuple(b, a), __trace);
}
//# sourceMappingURL=swap.mjs.map