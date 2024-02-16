import type { Effect } from "./effect.js";
/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to begin execution, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see onExit.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see `bracket`.
 *
 * @ets_data_first ensuring_
 */
export declare function ensuring<R1, X>(finalizer: Effect<R1, never, X>, __trace?: string): <R, E, A>(effect: Effect<R, E, A>) => Effect<R & R1, E, A>;
/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to begin execution, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see onExit.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see `bracket`.
 */
export declare function ensuring_<R, E, A, R1, X>(effect: Effect<R, E, A>, finalizer: Effect<R1, never, X>, __trace?: string): Effect<R & R1, E, A>;
//# sourceMappingURL=ensuring.d.ts.map