import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseEither_<R, R1, E, E2, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E2, O2>): Stream<R & R1, E2, E.Either<O, O2>>;
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseEither<R1, E2, O2>(that: Stream<R1, E2, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E2, E.Either<O, O2>>;
//# sourceMappingURL=orElseEither.d.ts.map