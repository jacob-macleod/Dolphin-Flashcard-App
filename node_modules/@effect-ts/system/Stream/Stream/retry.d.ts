import type * as CL from "../../Clock/index.js";
import * as SC from "../../Schedule/index.js";
import { Stream } from "./definitions.js";
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */
export declare function retry_<R, R1, E, O>(self: Stream<R, E, O>, schedule: SC.Schedule<R1, E, unknown>): Stream<R & R1 & CL.HasClock, E, O>;
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */
export declare function retry<R1, E>(schedule: SC.Schedule<R1, E, unknown>): <R, O>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, O>;
//# sourceMappingURL=retry.d.ts.map