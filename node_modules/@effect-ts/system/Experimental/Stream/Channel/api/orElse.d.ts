import type * as C from "../core.js";
/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 */
export declare function orElse_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem, OutElem1, OutDone, OutDone1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>): C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem | OutElem1, OutDone | OutDone1>;
/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 *
 * @ets_data_first orElse_
 */
export declare function orElse<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>(that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr1 | OutErr, OutElem1 | OutElem, OutDone1 | OutDone>;
//# sourceMappingURL=orElse.d.ts.map