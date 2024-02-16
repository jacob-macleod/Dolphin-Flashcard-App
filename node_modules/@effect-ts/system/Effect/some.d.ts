import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Converts an option on values into an option on errors.
 */
export declare function some<R, E, A>(self: Effect<R, E, O.Option<A>>, __trace?: string): Effect<R, O.Option<E>, A>;
//# sourceMappingURL=some.d.ts.map