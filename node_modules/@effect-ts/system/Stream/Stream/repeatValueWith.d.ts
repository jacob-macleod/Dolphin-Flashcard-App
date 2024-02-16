import type * as CL from "../../Clock/index.js";
import type * as SC from "../../Schedule/index.js";
import type { Stream } from "./definitions.js";
/**
 * Repeats the value using the provided schedule.
 */
export declare function repeatValueWith<R, A extends A1, A1, X>(a: () => A, schedule: SC.Schedule<R, A1, X>): Stream<R & CL.HasClock, never, A>;
//# sourceMappingURL=repeatValueWith.d.ts.map