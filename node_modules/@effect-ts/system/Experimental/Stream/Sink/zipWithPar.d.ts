import * as C from "./core.js";
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */
export declare function zipWithPar_<R, R1, InErr, InErr1, In, In1, OutErr, OutErr1, L, L1, Z, Z1, Z2>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, f: (z: Z, z1: Z1) => Z2, capacity?: number): C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr | OutErr1, L | L1, Z2>;
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 *
 * @ets_data_first zipWithPar_
 */
export declare function zipWithPar<R1, InErr1, In1, OutErr1, L1, Z, Z1, Z2>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, f: (z: Z, z1: Z1) => Z2, capacity?: number): <R, InErr, In, OutErr, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1 | OutErr, L1 | L, Z2>;
//# sourceMappingURL=zipWithPar.d.ts.map