import type { Option } from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */
export declare function flattenErrorOption<E2>(def: () => E2, __trace?: string): <R, E, A>(self: Effect<R, Option<E>, A>) => Effect<R, E2 | E, A>;
/**
 * Unwraps the optional error, defaulting to the provided value.
 */
export declare function flattenErrorOption_<R, E, A, E2>(self: Effect<R, Option<E>, A>, def: () => E2, __trace?: string): Effect<R, E | E2, A>;
//# sourceMappingURL=flattenErrorOption.d.ts.map