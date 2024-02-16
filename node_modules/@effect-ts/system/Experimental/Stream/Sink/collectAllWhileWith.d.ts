import type { Predicate } from "../../../Function/index.js";
import * as C from "./core.js";
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 */
export declare function collectAllWhileWith_<R, InErr, In, OutErr, L extends In, Z, S>(self: C.Sink<R, InErr, In, OutErr, L, Z>, z: S, p: Predicate<Z>, f: (s: S, z: Z) => S): C.Sink<R, InErr, In, OutErr, L, S>;
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 *
 * @ets_data_first collectAllWhileWith_
 */
export declare function collectAllWhileWith<Z, S>(z: S, p: Predicate<Z>, f: (s: S, z: Z) => S): <R, InErr, In, OutErr, L extends In>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In, OutErr, L, S>;
//# sourceMappingURL=collectAllWhileWith.d.ts.map