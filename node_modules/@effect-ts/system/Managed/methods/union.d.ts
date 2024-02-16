import type { _A, _E, _R } from "../../Utils/index.js";
import type { Managed } from "../managed.js";
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */
export declare function unionFn<ARGS extends any[], Ret extends Managed<any, any, any>>(_: (...args: ARGS) => Ret): (...args: ARGS) => Managed<_R<Ret>, _E<Ret>, _A<Ret>>;
/**
 * Compact the union
 *
 * @ets_optimize identity
 */
export declare function union<Ret extends Managed<any, any, any>>(_: Ret): Managed<_R<Ret>, _E<Ret>, _A<Ret>>;
//# sourceMappingURL=union.d.ts.map