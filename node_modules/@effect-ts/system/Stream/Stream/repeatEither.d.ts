import type * as CL from "../../Clock/index.js";
import * as E from "../../Either/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */
export declare function repeatEither_<R, R1, E, O, B>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, any, B>): Stream<R & R1 & CL.HasClock, E, E.Either<B, O>>;
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */
export declare function repeatEither<R1, B>(schedule: SC.Schedule<R1, any, B>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, E.Either<B, O>>;
//# sourceMappingURL=repeatEither.d.ts.map