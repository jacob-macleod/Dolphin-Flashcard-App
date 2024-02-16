import type { Predicate, Refinement } from "../../../Function/index.js";
import type * as C from "./core.js";
export declare function filterInput_<R, InErr, In, In1 extends In, In2 extends In1, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, p: Refinement<In1, In2>): C.Sink<R, InErr, In2, OutErr, L, Z>;
export declare function filterInput_<R, InErr, In, In1 extends In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, p: Predicate<In1>): C.Sink<R, InErr, In1, OutErr, L, Z>;
/**
 * @ets_data_first filterInput_
 */
export declare function filterInput<In, In1 extends In, In2 extends In1>(p: Refinement<In1, In2>): <R, InErr, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In2, OutErr, L, Z>;
export declare function filterInput<In, In1 extends In>(p: Predicate<In1>): <R, InErr, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In1, OutErr, L, Z>;
//# sourceMappingURL=filterInput.d.ts.map