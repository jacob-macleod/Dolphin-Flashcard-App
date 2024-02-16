import type * as C from "./core.js";
/**
 * Replaces this sink's result with the provided value.
 */
export declare function as_<R, InErr, In, OutErr, L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, z: Z1): C.Sink<R, InErr, In, OutErr, L, Z1>;
/**
 * Replaces this sink's result with the provided value.
 *
 * @ets_data_first as_
 */
export declare function as<Z1>(z: Z1): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In, OutErr, L, Z1>;
//# sourceMappingURL=as.d.ts.map