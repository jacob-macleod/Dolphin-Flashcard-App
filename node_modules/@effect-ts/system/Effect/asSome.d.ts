import * as O from "../Option/core.js";
import type { Effect } from "./effect.js";
/**
 * Maps the success value of this effect to an optional value.
 */
export declare function asSome<R, E, A>(fa: Effect<R, E, A>, __trace?: string): Effect<R, E, O.Option<A>>;
//# sourceMappingURL=asSome.d.ts.map