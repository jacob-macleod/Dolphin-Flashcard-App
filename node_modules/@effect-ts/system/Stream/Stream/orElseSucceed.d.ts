import type { Stream } from "./definitions.js";
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
export declare function orElseSucceed_<R, E, O, O1>(self: Stream<R, E, O>, o1: O1): Stream<R, never, O | O1>;
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
export declare function orElseSucceed<O1>(o1: O1): <R, E, O>(self: Stream<R, E, O>) => Stream<R, never, O1 | O>;
//# sourceMappingURL=orElseSucceed.d.ts.map