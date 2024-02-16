import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 *
 * @ets_data_first require_
 */
declare function _require<E>(error: () => E, __trace?: string): <R, A>(io: Effect<R, E, O.Option<A>>) => Effect<R, E, A>;
/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 */
export declare function require_<R, A, E>(io: Effect<R, E, O.Option<A>>, error: () => E, __trace?: string): Effect<R, E, A>;
export { _require as require };
//# sourceMappingURL=require.d.ts.map