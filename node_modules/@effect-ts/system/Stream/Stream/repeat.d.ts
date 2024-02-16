import type * as CL from "../../Clock/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */
export declare function repeat_<R, R1, E, O, B>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, unknown, B>): Stream<R & R1 & CL.HasClock, E, O>;
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */
export declare function repeat<R1, B>(schedule: SC.Schedule<R1, unknown, B>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, O>;
//# sourceMappingURL=repeat.d.ts.map