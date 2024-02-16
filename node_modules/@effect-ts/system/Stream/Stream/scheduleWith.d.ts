import type * as CL from "../../Clock/index.js";
import type * as H from "../../Has/index.js";
import * as SC from "../../Schedule/index.js";
import { Stream } from "./definitions.js";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 */
export declare function scheduleWith<R1, O, B>(schedule: SC.Schedule<R1, O, B>): <C, D>(f: (o: O) => C, g: (b: B) => D) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & H.Has<CL.Clock>, E, C | D>;
//# sourceMappingURL=scheduleWith.d.ts.map