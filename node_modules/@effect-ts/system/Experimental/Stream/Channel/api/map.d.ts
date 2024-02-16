import * as C from "../core.js";
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified function to the terminal value of this
 * channel.
 */
export declare function map_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, OutDone2>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (out: OutDone) => OutDone2): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>;
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified function to the terminal value of this
 * channel.
 *
 * @ets_data_first map_
 */
export declare function map<OutDone, OutDone2>(f: (out: OutDone) => OutDone2): <Env, InErr, InElem, InDone, OutErr, OutElem>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>;
//# sourceMappingURL=map.d.ts.map