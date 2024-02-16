import type { Either } from "../Either/index.js";
import * as E from "../Either/index.js";
import type { Effect } from "./effect.js";
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */
export declare function join<R1, E1, A1>(that: Effect<R1, E1, A1>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<Either<R, R1>, E1 | E, A1 | A>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function join_<R, E, A, R1, E1, A1>(self: Effect<R, E, A>, that: Effect<R1, E1, A1>, __trace?: string): Effect<E.Either<R, R1>, E | E1, A | A1>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function joinEither_<R, E, A, R1, E1, A1>(self: Effect<R, E, A>, that: Effect<R1, E1, A1>, __trace?: string): Effect<E.Either<R, R1>, E | E1, Either<A, A1>>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function joinEither<R, E, A, R1, E1, A1>(that: Effect<R1, E1, A1>, __trace?: string): (self: Effect<R, E, A>) => Effect<E.Either<R, R1>, E | E1, Either<A, A1>>;
//# sourceMappingURL=join.d.ts.map