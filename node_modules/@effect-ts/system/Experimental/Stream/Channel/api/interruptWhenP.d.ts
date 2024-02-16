import * as P from "../../../../Promise/index.js";
import type * as C from "../core.js";
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 */
export declare function interruptWhenP_<Env, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutDone, OutDone1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, promise: P.Promise<OutErr1, OutDone1>): C.Channel<Env, InErr, InElem, InDone, OutErr | OutErr1, OutElem, OutDone | OutDone1>;
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 *
 * @ets_data_first interruptWhenP_
 */
export declare function interruptWhenP<OutErr1, OutDone1>(promise: P.Promise<OutErr1, OutDone1>): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr1 | OutErr, OutElem, OutDone1 | OutDone>;
//# sourceMappingURL=interruptWhenP.d.ts.map