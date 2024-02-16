import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */
export declare function ensuring_<R, R1, E, A, Z>(self: C.Stream<R, E, A>, fin: T.Effect<R1, never, Z>): C.Stream<R & R1, E, A>;
/**
 * Executes the provided finalizer after this stream's finalizers run.
 *
 * @ets_data_first ensuring_
 */
export declare function ensuring<R1, Z>(fin: T.Effect<R1, never, Z>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E, A>;
//# sourceMappingURL=ensuring.d.ts.map