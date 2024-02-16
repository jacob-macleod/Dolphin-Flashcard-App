import type { Stream } from "./definitions.js";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElse_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, that: Stream<R1, E1, O1>): Stream<R & R1, E1, O | O1>;
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElse<R1, E1, O1>(that: Stream<R1, E1, O1>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1, O1 | O>;
//# sourceMappingURL=orElse.d.ts.map