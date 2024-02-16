// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as O from "../Option/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified partial function and
 * returns the old value.
 * If the function is undefined on the current value it doesn't change it.
 */

export const getAndUpdateSome = f => modify(v => Tp.tuple(v, O.getOrElse_(f(v), () => v)));
//# sourceMappingURL=getAndUpdateSome.mjs.map