import * as O from "../Option/core.js";
import type { Effect } from "./effect.js";
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */
export declare function catchSome<R, E, A, R2, E2, A2>(f: (e: E) => O.Option<Effect<R2, E2, A2>>, __trace?: string): (fa: Effect<R, E, A>) => Effect<R & R2, E | E2, A | A2>;
/**
 * Recovers from some or all of the error cases.
 */
export declare function catchSome_<R, E, A, R2, E2, A2>(fa: Effect<R, E, A>, f: (e: E) => O.Option<Effect<R2, E2, A2>>, __trace?: string): Effect<R & R2, E | E2, A | A2>;
//# sourceMappingURL=catchSome.d.ts.map