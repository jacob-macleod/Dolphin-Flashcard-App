import * as C from "../core.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 */
export declare function bufferChunks_<R, E, A>(self: C.Stream<R, E, A>, capacity: number): C.Stream<R, E, A>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @ets_data_first bufferChunks_
 */
export declare function bufferChunks(capacity: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=bufferChunks.d.ts.map