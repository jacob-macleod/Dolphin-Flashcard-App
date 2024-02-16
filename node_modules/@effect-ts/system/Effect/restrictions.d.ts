import type { Effect, RIO } from "./effect.js";
import type { DefaultEnv } from "./runtime.js";
/**
 * Forces `self` to be non failable
 *
 * @ets_optimize identity
 */
export declare function unfailable<R, A>(self: Effect<R, never, A>): RIO<R, A>;
/**
 * Forces `self` to be only require `DefaultEnv`
 *
 * @ets_optimize identity
 */
export declare function onlyDefaultEnv<E, A>(self: Effect<DefaultEnv, E, A>): Effect<DefaultEnv, E, A>;
/**
 * Forces `self` to be not require any environment
 *
 * @ets_optimize identity
 */
export declare function noEnv<E, A>(self: Effect<unknown, E, A>): Effect<unknown, E, A>;
//# sourceMappingURL=restrictions.d.ts.map