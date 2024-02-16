import type * as C from "../core.js";
/**
 * Returns a new channel, which is the concatenation of all the channels that are written out by
 * this channel. This method may only be called on channels that output other channels.
 */
export declare function concatOut<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>, OutDone>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>;
//# sourceMappingURL=concatOut.d.ts.map