import type * as Ex from "../../../Exit/index.js";
import * as MH from "../Channel/_internal/mergeHelpers.js";
import * as C from "./core.js";
/**
 * Runs both sinks in parallel on the input, using the specified merge
 * function as soon as one result or the other has been computed.
 */
export declare function raceWith_<R, R1, InErr, InErr1, In, In1, OutErr, OutErr1, L, L1, Z, Z1, Z2, Z3>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, leftDone: (ex: Ex.Exit<OutErr, Z>) => MH.MergeDecision<R1, OutErr1, Z1, OutErr1, Z2>, rightDone: (ex: Ex.Exit<OutErr1, Z1>) => MH.MergeDecision<R1, OutErr, Z, OutErr1, Z3>, capacity?: number): C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1, L | L1, Z2 | Z3>;
/**
 * Runs both sinks in parallel on the input, using the specified merge
 * function as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWith_
 */
export declare function raceWith<R1, InErr1, In1, OutErr, OutErr1, L1, Z, Z1, Z2, Z3>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>, leftDone: (ex: Ex.Exit<OutErr, Z>) => MH.MergeDecision<R1, OutErr1, Z1, OutErr1, Z2>, rightDone: (ex: Ex.Exit<OutErr1, Z1>) => MH.MergeDecision<R1, OutErr, Z, OutErr1, Z3>, capacity?: number): <R, InErr, In, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In & In1, OutErr1, L1 | L, Z2 | Z3>;
//# sourceMappingURL=raceWith.d.ts.map