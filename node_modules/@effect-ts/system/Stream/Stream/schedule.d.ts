import type * as CL from "../../Clock/index.js";
import type * as H from "../../Has/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Schedules the output of the stream using the provided `schedule`.
 */
export declare function schedule_<R, R1, E, O extends O1, O1, X>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, O1, X>): Stream<R & R1 & H.Has<CL.Clock>, E, O>;
/**
 * Schedules the output of the stream using the provided `schedule`.
 */
export declare function schedule<R1, O extends O1, O1, X>(schedule: SC.Schedule<R1, O1, X>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & H.Has<CL.Clock>, E, O>;
//# sourceMappingURL=schedule.d.ts.map