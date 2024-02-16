import * as C from "../core.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a sliding queue.
 */
export declare function bufferChunksSliding_<R, E, A>(self: C.Stream<R, E, A>, capacity: number): C.Stream<R, E, A>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a sliding queue.
 *
 * @ets_data_first bufferChunksSliding_
 */
export declare function bufferChunksSliding(capacity: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=bufferChunksSliding.d.ts.map