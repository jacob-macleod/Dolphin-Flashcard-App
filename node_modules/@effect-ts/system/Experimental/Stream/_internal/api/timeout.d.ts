import type * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Ends the stream if it does not produce a value after d duration.
 */
export declare function timeout_<R, E, A>(self: C.Stream<R, E, A>, d: number): C.Stream<R & CL.HasClock, E, A>;
/**
 * Ends the stream if it does not produce a value after d duration.
 *
 * @ets_data_first timeout_
 */
export declare function timeout(d: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock, E, A>;
//# sourceMappingURL=timeout.d.ts.map