import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Fan out the stream, producing a list of streams that have the same
 * elements as this stream. The driver stream will only ever advance the
 * `maximumLag` chunks before the slowest downstream stream.
 */
export declare function broadcast_<R, E, A>(self: C.Stream<R, E, A>, n: number, maximumLag: number): M.RIO<R, CK.Chunk<C.IO<E, A>>>;
/**
 * Fan out the stream, producing a list of streams that have the same
 * elements as this stream. The driver stream will only ever advance the
 * `maximumLag` chunks before the slowest downstream stream.
 *
 * @ets_data_first broadcast_
 */
export declare function broadcast(n: number, maximumLag: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, CK.Chunk<C.IO<E, A>>>;
//# sourceMappingURL=broadcast.d.ts.map