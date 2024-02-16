import * as C from "../core.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 */
export declare function bufferChunksDropping_<R, E, A>(self: C.Stream<R, E, A>, capacity: number): C.Stream<R, E, A>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 *
 * @ets_data_first bufferChunksDropping_
 */
export declare function bufferChunksDropping(capacity: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=bufferChunksDropping.d.ts.map