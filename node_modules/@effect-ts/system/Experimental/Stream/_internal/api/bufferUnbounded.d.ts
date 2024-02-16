import * as C from "../core.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * elements into an unbounded queue.
 */
export declare function bufferUnbounded<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, A>;
//# sourceMappingURL=bufferUnbounded.d.ts.map