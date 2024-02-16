// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified function and returns
 * the old value.
 */

export const getAndUpdate = f => modify(v => Tp.tuple(v, f(v)));
//# sourceMappingURL=getAndUpdate.mjs.map