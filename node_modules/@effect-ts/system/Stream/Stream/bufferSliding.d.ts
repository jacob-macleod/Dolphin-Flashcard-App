import { Stream } from "./definitions.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a sliding queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
export declare function bufferSliding_<R, E, O>(self: Stream<R, E, O>, capacity: number): Stream<R, E, O>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a sliding queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
export declare function bufferSliding(capacity: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=bufferSliding.d.ts.map