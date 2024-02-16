import type * as C from "./core.js";
/**
 * Like `zip`, but keeps only the result from this sink.
 */
export declare function zipRight_<R, R1, InErr, InErr1, In, In1 extends In, OutErr, OutErr1, L, L1 extends L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): C.Sink<R & R1, InErr & InErr1, In & In1, OutErr | OutErr1, L1, Z1>;
/**
 * Like `zip`, but keeps only the result from this sink.
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<R1, InErr1, In, In1 extends In, OutErr1, L, L1 extends L, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): <R, InErr, OutErr, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr & InErr1, In & In1, OutErr1 | OutErr, L1, Z1>;
//# sourceMappingURL=zipRight.d.ts.map