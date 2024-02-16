import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns a successful effect with the head of the list if the list is
 * non-empty or fails with the error `None` if the list is empty.
 */
export declare function head<R, E, A>(self: Effect<R, E, Iterable<A>>, __trace?: string): Effect<R, O.Option<E>, A>;
//# sourceMappingURL=head.d.ts.map