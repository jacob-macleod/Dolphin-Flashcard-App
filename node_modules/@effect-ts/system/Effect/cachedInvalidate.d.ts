import type { Clock } from "../Clock/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Has } from "../Has/index.js";
import type { Effect, IO, RIO, UIO } from "./effect.js";
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @ets_data_first cachedInvalidate_
 */
export declare function cachedInvalidate(ttl: number, __trace?: string): <R, E, A>(fa: Effect<R, E, A>) => RIO<R & Has<Clock>, Tp.Tuple<[IO<E, A>, UIO<void>]>>;
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 */
export declare function cachedInvalidate_<R, E, A>(fa: Effect<R, E, A>, ttl: number, __trace?: string): RIO<R & Has<Clock>, Tp.Tuple<[IO<E, A>, UIO<void>]>>;
//# sourceMappingURL=cachedInvalidate.d.ts.map