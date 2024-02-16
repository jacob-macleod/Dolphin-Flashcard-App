import type { Effect } from "../../Effect/index.js";
import type { Managed } from "../managed.js";
/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst`.
 *
 * @ets_data_first ensuringFirst_
 */
export declare function ensuringFirst<R1>(f: Effect<R1, never, unknown>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R & R1, E, A>;
/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst_`.
 */
export declare function ensuringFirst_<R, E, A, R1>(self: Managed<R, E, A>, f: Effect<R1, never, unknown>, __trace?: string): Managed<R & R1, E, A>;
//# sourceMappingURL=ensuringFirst.d.ts.map