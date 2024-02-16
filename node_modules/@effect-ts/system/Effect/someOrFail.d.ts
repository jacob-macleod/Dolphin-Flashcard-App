import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */
export declare function someOrFail<E2>(orFail: () => E2, __trace?: string): <R, E, A>(self: Effect<R, E, O.Option<A>>) => Effect<R, E2 | E, A>;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */
export declare function someOrFail_<R, E, A, E2>(self: Effect<R, E, O.Option<A>>, orFail: () => E2, __trace?: string): Effect<R, E | E2, A>;
//# sourceMappingURL=someOrFail.d.ts.map