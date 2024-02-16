import type * as C from "./core.js";
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */
export declare function dimap_<R, InErr, In, In1, OutErr, L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (in_: In1) => In, g: (z: Z) => Z1): C.Sink<R, InErr, In1, OutErr, L, Z1>;
/**
 * Transforms both inputs and result of this sink using the provided functions.
 *
 * @ets_data_first dimap_
 */
export declare function dimap<In, In1, Z, Z1>(f: (in_: In1) => In, g: (z: Z) => Z1): <R, InErr, OutErr, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In1, OutErr, L, Z1>;
//# sourceMappingURL=dimap.d.ts.map