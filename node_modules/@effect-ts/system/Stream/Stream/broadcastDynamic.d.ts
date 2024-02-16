import * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */
export declare function broadcastDynamic_<R, E, O>(self: Stream<R, E, O>, maximumLag: number): M.Managed<R, never, Stream<unknown, E, O>>;
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */
export declare function broadcastDynamic(maximumLag: number): <R, E, O>(self: Stream<R, E, O>) => M.Managed<R, never, Stream<unknown, E, O>>;
//# sourceMappingURL=broadcastDynamic.d.ts.map