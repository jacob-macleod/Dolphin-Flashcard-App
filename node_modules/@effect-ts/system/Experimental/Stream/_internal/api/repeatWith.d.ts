import type * as CL from "../../../../Clock/index.js";
import * as SC from "../../../../Schedule/index.js";
import * as C from "../core.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */
export declare function repeatWith_<R, R1, E, A, B, C1, C2>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, any, B>, f: (a: A) => C1, g: (b: B) => C2): C.Stream<R & R1 & CL.HasClock, E, C1 | C2>;
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 *
 * @ets_data_first repeatWith_
 */
export declare function repeatWith<R1, A, B, C1, C2>(schedule: SC.Schedule<R1, any, B>, f: (a: A) => C1, g: (b: B) => C2): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, C1 | C2>;
//# sourceMappingURL=repeatWith.d.ts.map