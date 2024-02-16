import * as E from "../../../Either/index.js";
import * as C from "./core.js";
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */
export declare function raceBoth_<R, R1, InErr, InErr1, In, In1, OutErr, OutErr1, L, L1, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, capacity?: number): C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr | OutErr1, L | L1, E.Either<Z, Z1>>;
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 *
 * @ets_data_first orElse_
 */
export declare function raceBoth<R1, InErr1, In1, OutErr1, L1, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, capacity?: number): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1 | OutErr, L1 | L, E.Either<Z, Z1>>;
//# sourceMappingURL=raceBoth.d.ts.map