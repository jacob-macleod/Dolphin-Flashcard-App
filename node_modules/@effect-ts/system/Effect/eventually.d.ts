import type { Effect } from "./effect.js";
/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */
export declare function eventually<R, E, A>(fa: Effect<R, E, A>, __trace?: string): Effect<R, never, A>;
//# sourceMappingURL=eventually.d.ts.map