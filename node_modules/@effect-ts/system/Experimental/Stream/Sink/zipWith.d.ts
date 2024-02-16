import type * as C from "./core.js";
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */
export declare function zipWith_<R, R1, InErr, InErr1, In, In1 extends In, OutErr, OutErr1, L, L1 extends L, Z, Z1, Z2>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): C.Sink<R & R1, InErr & InErr1, In & In1, OutErr | OutErr1, L1, Z2>;
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<R1, InErr1, In, In1 extends In, OutErr1, L, L1 extends L, Z, Z1, Z2>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): <R, InErr, OutErr>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr & InErr1, In & In1, OutErr1 | OutErr, L1, Z2>;
//# sourceMappingURL=zipWith.d.ts.map