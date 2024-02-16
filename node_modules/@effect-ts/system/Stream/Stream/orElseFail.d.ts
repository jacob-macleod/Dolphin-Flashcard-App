import type { Stream } from "./definitions.js";
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseFail_<R, E, O, E1>(self: Stream<R, E, O>, e: E1): Stream<R, E1, O>;
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseFail<R, E, O, E1>(e: E1): (self: Stream<R, E, O>) => Stream<R, E1, O>;
//# sourceMappingURL=orElseFail.d.ts.map