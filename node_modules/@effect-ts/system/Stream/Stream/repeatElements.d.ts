import type * as CL from "../../Clock/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
export declare function repeatElements_<R, R1, E, O extends O1, O1, X>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, O1, X>): Stream<R & R1 & CL.HasClock, E, O>;
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
export declare function repeatElements<R1, O extends O1, O1, X>(schedule: SC.Schedule<R1, O1, X>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, O>;
//# sourceMappingURL=repeatElements.d.ts.map