import type * as CL from "../../Clock/index.js";
import * as SC from "../../Schedule/index.js";
import { Stream } from "./definitions.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */
export declare function repeatWith<R1, B>(schedule: SC.Schedule<R1, any, B>): <O, C, D>(f: (o: O) => C, g: (b: B) => D) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E, C | D>;
//# sourceMappingURL=repeatWith.d.ts.map