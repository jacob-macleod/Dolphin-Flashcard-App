import { Stream } from "./definitions.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a dropping queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
export declare function bufferDropping_<R, E, O>(self: Stream<R, E, O>, capacity: number): Stream<R, E, O>;
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a dropping queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
export declare function bufferDropping(capacity: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=bufferDropping.d.ts.map