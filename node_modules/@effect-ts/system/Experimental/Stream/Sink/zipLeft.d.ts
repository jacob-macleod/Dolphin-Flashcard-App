import type * as C from "./core.js";
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */
export declare function zipLeft_<R, R1, InErr, InErr1, In, In1 extends In, OutErr, OutErr1, L, L1 extends L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): C.Sink<R & R1, InErr & InErr1, In & In1, OutErr | OutErr1, L1, Z>;
/**
 * Like `zip`, but keeps only the result from `that sink.
 *
 * @ets_data_first zipLeft_
 */
export declare function zipLeft<R1, InErr1, In, In1 extends In, OutErr1, L, L1 extends L, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): <R, InErr, OutErr, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr & InErr1, In & In1, OutErr1 | OutErr, L1, Z>;
//# sourceMappingURL=zipLeft.d.ts.map