import type * as CL from "../../../../Clock/index.js";
import * as SC from "../../../../Schedule/index.js";
import * as C from "../core.js";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 */
export declare function scheduleWith_<R, R1, E, E1, A, B, C1, C2>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, A, B>, f: (a: A) => C1, g: (b: B) => C2): C.Stream<R & R1 & CL.HasClock, E | E1, C1 | C2>;
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 *
 * @ets_data_first scheduleWith_
 */
export declare function scheduleWith<R1, A, B, C1, C2>(schedule: SC.Schedule<R1, A, B>, f: (a: A) => C1, g: (b: B) => C2): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, unknown, C1 | C2>;
//# sourceMappingURL=scheduleWith.d.ts.map