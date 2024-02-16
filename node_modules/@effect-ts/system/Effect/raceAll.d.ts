import type { NonEmptyArray } from "../Collections/Immutable/NonEmptyArray/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */
export declare function raceAllWithStrategy<R, E, A>(ios: NonEmptyArray<Effect<R, E, A>>, interruptStrategy: "background" | "wait", __trace?: string): Effect<R, E, A>;
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */
export declare function raceAll<R, E, A>(ios: NonEmptyArray<Effect<R, E, A>>, __trace?: string): Effect<R, E, A>;
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */
export declare function raceAllWait<R, E, A>(ios: NonEmptyArray<Effect<R, E, A>>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=raceAll.d.ts.map