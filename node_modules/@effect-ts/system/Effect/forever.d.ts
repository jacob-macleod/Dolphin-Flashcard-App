import type { Effect } from "./effect.js";
/**
 * Repeats this effect forever (until the first error).
 */
export declare function forever<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, E, never>;
//# sourceMappingURL=forever.d.ts.map