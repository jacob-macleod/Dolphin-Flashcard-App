import type { Effect } from "./effect.js";
/**
 * Ignores the result of the effect replacing it with a void
 */
export declare function asUnit<R, E, X>(self: Effect<R, E, X>, __trace?: string): Effect<R, E, void>;
//# sourceMappingURL=asUnit.d.ts.map