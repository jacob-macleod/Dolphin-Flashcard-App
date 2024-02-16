import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as C from "../core.js";
/**
 * Returns a new channel, which is the same as this one, except that all the outputs are
 * collected and bundled into a tuple together with the terminal value of this channel.
 *
 * As the channel returned from this channel collect's all of this channel's output into an in-
 * memory chunk, it is not safe to call this method on channels that output a large or unbounded
 * number of values.
 */
export declare function doneCollect<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>): C.Channel<Env, InErr, InElem, InDone, OutErr, never, Tp.Tuple<[CK.Chunk<OutElem>, OutDone]>>;
//# sourceMappingURL=doneCollect.d.ts.map