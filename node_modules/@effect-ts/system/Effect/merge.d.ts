import type { Effect } from "./effect.js";
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 */
export declare function merge<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, never, E | A>;
//# sourceMappingURL=merge.d.ts.map