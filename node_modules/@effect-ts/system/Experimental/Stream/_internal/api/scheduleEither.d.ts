import type * as CL from "../../../../Clock/index.js";
import * as E from "../../../../Either/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */
export declare function scheduleEither_<R, R1, E, A, B>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, A, B>): C.Stream<R & CL.HasClock & R1, E, E.Either<B, A>>;
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 *
 * @ets_data_first scheduleEither_
 */
export declare function scheduleEither<R1, A, B>(schedule: SC.Schedule<R1, A, B>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock & R1, E, E.Either<B, A>>;
//# sourceMappingURL=scheduleEither.d.ts.map