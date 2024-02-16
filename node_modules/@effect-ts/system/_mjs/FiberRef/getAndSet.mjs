// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { modify } from "./modify.mjs";
/**
 * Atomically sets the value associated with the current fiber and returns
 * the old value.
 */

export const getAndSet = a => modify(v => Tp.tuple(v, a));
//# sourceMappingURL=getAndSet.mjs.map