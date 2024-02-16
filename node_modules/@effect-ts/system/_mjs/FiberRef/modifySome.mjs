// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { getOrElse_ } from "../Option/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified partial function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */

export function modifySome(defaultValue) {
  return f => modify(v => getOrElse_(f(v), () => Tp.tuple(defaultValue(), v)));
}
//# sourceMappingURL=modifySome.mjs.map