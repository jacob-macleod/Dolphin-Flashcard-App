import type * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 */
export declare function fixed_<R, E, A>(self: C.Stream<R, E, A>, duration: number): C.Stream<R & CL.HasClock, E, A>;
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 *
 * @ets_data_first fixed_
 */
export declare function fixed(duration: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock, E, A>;
//# sourceMappingURL=fixed.d.ts.map