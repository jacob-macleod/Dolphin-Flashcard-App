import type { Either } from "../Either/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 */
export declare function tapEither_<R, R1, E, E1, A, A1>(self: Effect<R, E, A>, f: (exit: Either<E, A>) => Effect<R1, E1, A1>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 *
 * @ets_data_first tapEither_
 */
export declare function tapEither<R1, E, E1, A, A1>(f: (exit: Either<E, A>) => Effect<R1, E1, A1>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & R1, E | E1, A>;
//# sourceMappingURL=tapEither.d.ts.map