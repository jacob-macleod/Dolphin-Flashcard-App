import type * as C from "./core.js";
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */
export declare function zipParLeft_<R, R1, InErr, InErr1, In, In1, OutErr, OutErr1, L, L1, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr | OutErr1, L | L1, Z>;
/**
 * Like `zipPar`, but keeps only the result from this sink.
 *
 * @ets_data_first zipParLeft_
 */
export declare function zipParLeft<R1, InErr1, In1, OutErr1, L1, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1 | OutErr, L1 | L, Z>;
//# sourceMappingURL=zipParLeft.d.ts.map