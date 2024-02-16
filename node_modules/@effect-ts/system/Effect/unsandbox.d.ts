import type { Cause } from "../Cause/index.js";
import type { Effect } from "./effect.js";
/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 */
export declare function unsandbox<R, E, A>(fa: Effect<R, Cause<E>, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=unsandbox.d.ts.map