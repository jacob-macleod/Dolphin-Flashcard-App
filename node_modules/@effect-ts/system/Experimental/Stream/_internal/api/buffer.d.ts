import * as C from "../core.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 */
export declare function buffer_<R, E, A>(self: C.Stream<R, E, A>, capacity: number): C.Stream<R, E, A>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @ets_data_first buffer_
 */
export declare function buffer(capacity: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=buffer.d.ts.map