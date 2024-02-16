import type * as CL from "../../../../Clock/index.js";
import * as SC from "../../../../Schedule/index.js";
import * as C from "../core.js";
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
export declare function repeatElementsWith_<R, R1, E, A, B, C1, C2>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, A, B>, f: (a: A) => C1, g: (b: B) => C2): C.Stream<R & R1 & CL.HasClock, E, C1 | C2>;
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
 *
 * @ets_data_first repeatElementsWith_
 */
export declare function repeatElementsWith<R1, A, B, C1, C2>(schedule: SC.Schedule<R1, A, B>, f: (a: A) => C1, g: (b: B) => C2): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, C1 | C2>;
//# sourceMappingURL=repeatElementsWith.d.ts.map