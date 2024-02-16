import type * as CL from "../../../../Clock/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
export declare function repeatElements_<R, R1, E, A, B>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, any, B>): C.Stream<R & R1 & CL.HasClock, E, A>;
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * @ets_data_first repeatElements_
 */
export declare function repeatElements<R1, B>(schedule: SC.Schedule<R1, any, B>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, A>;
//# sourceMappingURL=repeatElements.d.ts.map