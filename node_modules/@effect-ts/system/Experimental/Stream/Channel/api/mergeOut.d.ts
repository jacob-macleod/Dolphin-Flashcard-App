import type * as C from "../core.js";
export declare function mergeOut_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem1, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, any>, OutDone>, n: number): C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem1, any>;
/**
 * @ets_data_first mergeOut_
 */
export declare function mergeOut(n: number): <Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem1, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, any>, OutDone>) => C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem1, any>;
//# sourceMappingURL=mergeOut.d.ts.map