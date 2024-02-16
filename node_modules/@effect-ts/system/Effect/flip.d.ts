import type { Effect } from "./effect.js";
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */
export declare function flip<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, A, E>;
//# sourceMappingURL=flip.d.ts.map