import type { Scope } from "../Scope/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 *
 * @ets_data_first in_
 */
declare function _in(scope: Scope<any>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 */
export declare function in_<R, E, A>(self: Effect<R, E, A>, scope: Scope<any>, __trace?: string): Effect<R, E, A>;
export { _in as in };
//# sourceMappingURL=in.d.ts.map