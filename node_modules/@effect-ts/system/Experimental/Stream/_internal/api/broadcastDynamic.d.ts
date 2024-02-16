import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */
export declare function broadcastDynamic_<R, E, A>(self: C.Stream<R, E, A>, maximumLag: number): M.RIO<R, C.IO<E, A>>;
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 *
 * @ets_data_first broadcastDynamic_
 */
export declare function broadcastDynamic(maximumLag: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, C.IO<E, A>>;
//# sourceMappingURL=broadcastDynamic.d.ts.map