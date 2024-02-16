import type * as CL from "../../../../Clock/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */
export declare function repeatSchedule_<R, R1, E, A, B>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, any, B>): C.Stream<R & R1 & CL.HasClock, E, A>;
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 *
 * @ets_data_first repeat_
 */
export declare function repeatSchedule<R1, B>(schedule: SC.Schedule<R1, any, B>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, A>;
//# sourceMappingURL=repeatSchedule.d.ts.map