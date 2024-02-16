import type * as CL from "../../Clock/index.js";
import * as E from "../../Either/index.js";
import type * as H from "../../Has/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */
export declare function scheduleEither_<R, R1, E, O, B>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, O, B>): Stream<R & R1 & H.Has<CL.Clock>, E, E.Either<B, O>>;
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */
export declare function scheduleEither<R1, O, B>(schedule: SC.Schedule<R1, O, B>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & H.Has<CL.Clock>, E, E.Either<B, O>>;
//# sourceMappingURL=scheduleEither.d.ts.map