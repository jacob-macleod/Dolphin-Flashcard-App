import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * The moral equivalent of `if (p) exp`
 */
export declare function when_<R1, E1, A>(self: Effect<R1, E1, A>, predicate: () => boolean, __trace?: string): Effect<R1, E1, O.Option<A>>;
/**
 * The moral equivalent of `if (p) exp`
 *
 * @ets_data_first when_
 */
export declare function when(predicate: () => boolean, __trace?: string): <R1, E1, A>(self: Effect<R1, E1, A>) => Effect<R1, E1, O.Option<A>>;
//# sourceMappingURL=when.d.ts.map