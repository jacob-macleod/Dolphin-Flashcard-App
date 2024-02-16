import type * as C from "../core.js";
/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 */
export declare function as_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, OutDone2>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, z2: OutDone2): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>;
/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 *
 * @ets_data_first as_
 */
export declare function as<OutDone2>(z2: OutDone2): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>;
//# sourceMappingURL=as.d.ts.map