import type { Effect } from "./effect.js";
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */
export declare function orDie<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, never, A>;
//# sourceMappingURL=orDie.d.ts.map