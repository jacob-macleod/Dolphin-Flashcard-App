import * as T from "../../../Effect/index.js";
import * as O from "../../../Option/index.js";
import * as C from "./core.js";
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */
export declare function untilOutputEffect_<R, R1, InErr, In, OutErr, OutErr1, L extends In, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (z: Z) => T.Effect<R1, OutErr1, boolean>): C.Sink<R & R1, InErr, In, OutErr | OutErr1, L, O.Option<Z>>;
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 *
 * @ets_data_first untilOutputEffect_
 */
export declare function untilOutputEffect<R1, OutErr1, Z>(f: (z: Z) => T.Effect<R1, OutErr1, boolean>): <R, InErr, In, OutErr, L extends In>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr, In, OutErr1 | OutErr, L, O.Option<Z>>;
//# sourceMappingURL=untilOutputEffect.d.ts.map