import type { Cause } from "../Cause/cause.js";
import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Recovers from some or all of the error cases with provided cause.
 */
export declare function catchSomeCause_<R2, E2, A2, R, E, A>(effect: Effect<R2, E2, A2>, f: (_: Cause<E2>) => O.Option<Effect<R, E, A>>, __trace?: string): Effect<R2 & R, E2 | E, A2 | A>;
/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @ets_data_first catchSomeCause_
 */
export declare function catchSomeCause<R, E, E2, A>(f: (_: Cause<E2>) => O.Option<Effect<R, E, A>>, __trace?: string): <R2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2 & R, E | E2, A | A2>;
//# sourceMappingURL=catchSomeCause_.d.ts.map