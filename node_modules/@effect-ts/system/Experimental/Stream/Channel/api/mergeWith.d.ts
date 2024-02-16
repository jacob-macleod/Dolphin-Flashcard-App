import * as Ex from "../../../../Exit/index.js";
import * as MH from "../_internal/mergeHelpers.js";
import * as C from "../core.js";
/**
 * Returns a new channel, which is the merge of this channel and the specified channel, where
 * the behavior of the returned channel on left or right early termination is decided by the
 * specified `leftDone` and `rightDone` merge decisions.
 */
export declare function mergeWith_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutErr2, OutErr3, OutElem, OutElem1, OutDone, OutDone1, OutDone2, OutDone3>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>, leftDone: (ex: Ex.Exit<OutErr, OutDone>) => MH.MergeDecision<Env1, OutErr1, OutDone1, OutErr2, OutDone2>, rightDone: (ex: Ex.Exit<OutErr1, OutDone1>) => MH.MergeDecision<Env1, OutErr, OutDone, OutErr3, OutDone3>): C.Channel<Env1 & Env, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr2 | OutErr3, OutElem | OutElem1, OutDone2 | OutDone3>;
/**
 * Returns a new channel, which is the merge of this channel and the specified channel, where
 * the behavior of the returned channel on left or right early termination is decided by the
 * specified `leftDone` and `rightDone` merge decisions.
 *
 * @ets_data_first mergeWith_
 */
export declare function mergeWith<Env1, InErr1, InElem1, InDone1, OutErr, OutErr1, OutErr2, OutErr3, OutElem1, OutDone, OutDone1, OutDone2, OutDone3>(that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>, leftDone: (ex: Ex.Exit<OutErr, OutDone>) => MH.MergeDecision<Env1, OutErr1, OutDone1, OutErr2, OutDone2>, rightDone: (ex: Ex.Exit<OutErr1, OutDone1>) => MH.MergeDecision<Env1, OutErr, OutDone, OutErr3, OutDone3>): <Env, InErr, InElem, InDone, OutElem>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env1 & Env, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr2 | OutErr3, OutElem1 | OutElem, OutDone2 | OutDone3>;
//# sourceMappingURL=mergeWith.d.ts.map