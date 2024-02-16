import type { Effect } from "./effect.js";
/**
 * Exposes all parallel errors in a single call
 */
export declare function parallelErrors<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, readonly E[], A>;
//# sourceMappingURL=parallelErrors.d.ts.map