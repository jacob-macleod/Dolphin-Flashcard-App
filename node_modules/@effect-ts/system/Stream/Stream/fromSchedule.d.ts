import type * as CL from "../../Clock/index.js";
import * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a `Schedule` that does not require any further
 * input. The stream will emit an element for each value output from the
 * schedule, continuing for as long as the schedule continues.
 */
export declare const fromSchedule: <R, A>(schedule: SC.Schedule<R, unknown, A>) => Stream<R & CL.HasClock, never, A>;
//# sourceMappingURL=fromSchedule.d.ts.map