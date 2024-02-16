import type * as C from "../core.js";
export declare function mergeOutWith_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem1, OutDone1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>, OutDone1>, n: number, f: (o1: OutDone1, o2: OutDone1) => OutDone1): C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem1, OutDone1>;
/**
 * @ets_data_first mergeOutWith_
 */
export declare function mergeOutWith<OutDone1>(n: number, f: (o1: OutDone1, o2: OutDone1) => OutDone1): <Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>, OutDone1>) => C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem1, OutDone1>;
//# sourceMappingURL=mergeOutWith.d.ts.map