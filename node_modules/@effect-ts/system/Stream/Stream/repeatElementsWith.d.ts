import type * as CL from "../../Clock/index.js";
import * as SC from "../../Schedule/index.js";
import { Stream } from "./definitions.js";
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * This function accepts two conversion functions, which allow the output of this stream and the
 * output of the provided schedule to be unified into a single type. For example, `Either` or
 * similar data type.
 */
export declare function repeatElementsWith<R1, O, B>(schedule: SC.Schedule<R1, O, B>): <C, D>(f: (o: O) => C, g: (b: B) => D) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, C | D>;
//# sourceMappingURL=repeatElementsWith.d.ts.map