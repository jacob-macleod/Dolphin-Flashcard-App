import type { Cause } from "../Cause/index.js";
import type { Effect } from "./effect.js";
/**
 * Exposes the full cause of failure of this effect.
 */
export declare function sandbox<R, E, A>(fa: Effect<R, E, A>, __trace?: string): Effect<R, Cause<E>, A>;
//# sourceMappingURL=sandbox.d.ts.map