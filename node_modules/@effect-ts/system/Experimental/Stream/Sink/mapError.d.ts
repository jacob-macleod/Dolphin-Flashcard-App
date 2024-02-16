import * as C from "./core.js";
/**
 * Transforms the errors emitted by this sink using `f`.
 */
export declare function mapError_<R, InErr, In, OutErr, OutErr1, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (err: OutErr) => OutErr1): C.Sink<R, InErr, In, OutErr1, L, Z>;
/**
 * Transforms the errors emitted by this sink using `f`.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<OutErr, OutErr1>(f: (err: OutErr) => OutErr1): <R, InErr, In, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In, OutErr1, L, Z>;
//# sourceMappingURL=mapError.d.ts.map