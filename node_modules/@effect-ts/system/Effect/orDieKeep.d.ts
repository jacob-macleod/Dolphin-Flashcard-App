import type { Effect } from "./effect.js";
/**
 * Converts all failures to unchecked exceptions
 */
export declare function orDieKeep<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, never, A>;
//# sourceMappingURL=orDieKeep.d.ts.map