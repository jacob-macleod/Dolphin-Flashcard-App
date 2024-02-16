import type * as CL from "../../../../Clock/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Repeats the value using the provided schedule.
 */
export declare function repeatValueWith<R, A, Z>(a: A, schedule: SC.Schedule<R, A, Z>): C.Stream<R & CL.HasClock, never, A>;
//# sourceMappingURL=repeatValueWith.d.ts.map