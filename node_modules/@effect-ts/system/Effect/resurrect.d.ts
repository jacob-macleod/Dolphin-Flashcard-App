import type { Effect } from "./effect.js";
/**
 * Unearth the unchecked failure of the effect. (opposite of `orDie`)
 */
export declare function resurrect<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, unknown, A>;
//# sourceMappingURL=resurrect.d.ts.map