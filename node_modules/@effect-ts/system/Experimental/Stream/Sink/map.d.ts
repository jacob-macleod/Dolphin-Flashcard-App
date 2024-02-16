import * as C from "./core.js";
/**
 * Transforms this sink's result.
 */
export declare function map_<R, InErr, In, OutErr, L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (z: Z) => Z1): C.Sink<R, InErr, In, OutErr, L, Z1>;
/**
 * Transforms this sink's result.
 *
 * @ets_data_first map_
 */
export declare function map<Z, Z1>(f: (z: Z) => Z1): <R, InErr, In, OutErr, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In, OutErr, L, Z1>;
//# sourceMappingURL=map.d.ts.map