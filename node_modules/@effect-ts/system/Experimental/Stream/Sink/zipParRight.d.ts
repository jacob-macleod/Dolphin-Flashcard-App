import type * as C from "./core.js";
/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 */
export declare function zipParRight_<R, R1, InErr, InErr1, In, In1, OutErr, OutErr1, L, L1, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr | OutErr1, L | L1, Z1>;
/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 *
 * @ets_data_first zipParRight_
 */
export declare function zipParRight<R1, InErr1, In1, OutErr1, L1, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1 | OutErr, L1 | L, Z1>;
//# sourceMappingURL=zipParRight.d.ts.map