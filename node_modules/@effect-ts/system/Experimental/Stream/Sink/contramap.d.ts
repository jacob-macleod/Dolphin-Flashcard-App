import type * as C from "./core.js";
/**
 * Transforms this sink's input elements.
 */
export declare function contramap_<R, InErr, In, In1, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (in_: In1) => In): C.Sink<R, InErr, In1, OutErr, L, Z>;
/**
 * Transforms this sink's input elements.
 *
 * @ets_data_first contramap_
 */
export declare function contramap<In, In1>(f: (in_: In1) => In): <R, InErr, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In1, OutErr, L, Z>;
//# sourceMappingURL=contramap.d.ts.map