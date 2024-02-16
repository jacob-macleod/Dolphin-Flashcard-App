import type { Clock } from "../Clock/index.js";
import type { Has } from "../Has/index.js";
import type { Effect, IO, RIO } from "./effect.js";
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 *
 * @ets_data_first cached_
 */
export declare function cached(ttl: number, __trace?: string): <R, E, A>(fa: Effect<R, E, A>) => RIO<R & Has<Clock>, IO<E, A>>;
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 */
export declare function cached_<R, E, A>(fa: Effect<R, E, A>, ttl: number, __trace?: string): RIO<R & Has<Clock>, IO<E, A>>;
//# sourceMappingURL=cached.d.ts.map