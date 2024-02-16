import type * as CL from "../../../../Clock/index.js";
import * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a `Schedule` that does not require any further
 * input. The stream will emit an element for each value output from the
 * schedule, continuing for as long as the schedule continues.
 */
export declare function fromSchedule<R, A>(schedule: SC.Schedule<R, unknown, A>): C.Stream<CL.HasClock & R, never, A>;
//# sourceMappingURL=fromSchedule.d.ts.map