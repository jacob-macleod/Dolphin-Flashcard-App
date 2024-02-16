import type * as CL from "../../../../Clock/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Schedules the output of the stream using the provided `schedule`.
 */
export declare function schedule_<R, R1, E, A extends B, B, Z>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, B, Z>): C.Stream<R & CL.HasClock & R1, E, A>;
/**
 * Schedules the output of the stream using the provided `schedule`.
 *
 * @ets_data_first schedule_
 */
export declare function schedule<R1, B, Z>(schedule: SC.Schedule<R1, B, Z>): <R, E, A extends B>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock & R1, E, A>;
//# sourceMappingURL=schedule.d.ts.map