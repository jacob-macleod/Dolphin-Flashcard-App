import { Stream } from "./definitions.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * elements into an unbounded queue.
 */
export declare function bufferUnbounded<R, E, O>(self: Stream<R, E, O>): Stream<R, E, O>;
//# sourceMappingURL=bufferUnbounded.d.ts.map