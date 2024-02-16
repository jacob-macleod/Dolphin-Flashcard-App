import type * as CL from "../../Clock/index.js";
import * as E from "../../Either/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
export declare function repeatElementsEither_<R, R1, E, O, B>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, O, B>): Stream<R & R1 & CL.HasClock, E, E.Either<B, O>>;
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
export declare function repeatElementsEither<R1, O, B>(schedule: SC.Schedule<R1, O, B>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, E.Either<B, O>>;
//# sourceMappingURL=repeatElementsEither.d.ts.map