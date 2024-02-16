import type * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
export declare function filterInputEffect_<R, R1, InErr, InErr1 extends InErr, In, In1 extends In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, p: (in_: In1) => T.Effect<R1, InErr1, boolean>): C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
/**
 * @ets_data_first filterInputEffect_
 */
export declare function filterInputEffect<R1, InErr, InErr1 extends InErr, In, In1 extends In>(p: (in_: In1) => T.Effect<R1, InErr1, boolean>): <R, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
//# sourceMappingURL=filterInputEffect.d.ts.map