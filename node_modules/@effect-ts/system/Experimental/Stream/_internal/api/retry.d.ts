import type * as CL from "../../../../Clock/index.js";
import * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 */
export declare function retry_<R, R1, E, A, Z>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, E, Z>): C.Stream<R & R1 & CL.HasClock, E, A>;
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @ets_data_first retry_
 */
export declare function retry<R1, E, Z>(schedule: SC.Schedule<R1, E, Z>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, A>;
//# sourceMappingURL=retry.d.ts.map