import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Converts an option on errors into an option on values.
 */
export declare function unsome<R, E, A>(self: Effect<R, O.Option<E>, A>): Effect<R, E, O.Option<A>>;
//# sourceMappingURL=unsome.d.ts.map