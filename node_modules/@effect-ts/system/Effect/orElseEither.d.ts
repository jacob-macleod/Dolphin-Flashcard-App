import * as E from "../Either/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @ets_data_first orElseEither_
 */
export declare function orElseEither<R2, E2, A2>(that: () => Effect<R2, E2, A2>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2, E.Either<A, A2>>;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 */
export declare function orElseEither_<R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: () => Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E2, E.Either<A, A2>>;
//# sourceMappingURL=orElseEither.d.ts.map