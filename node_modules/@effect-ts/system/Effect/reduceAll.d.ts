import * as NA from "../Collections/Immutable/NonEmptyArray/index.js";
import type { Effect } from "./effect.js";
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */
export declare function reduceAll_<R, E, A>(as: NA.NonEmptyArray<Effect<R, E, A>>, f: (acc: A, a: A) => A, __trace?: string): Effect<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */
export declare function reduceAll<A>(f: (acc: A, a: A) => A, __trace?: string): <R, E>(as: NA.NonEmptyArray<Effect<R, E, A>>) => Effect<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */
export declare function reduceAllPar_<R, E, A>(as: NA.NonEmptyArray<Effect<R, E, A>>, f: (acc: A, a: A) => A, __trace?: string): Effect<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */
export declare function reduceAllPar<A>(f: (acc: A, a: A) => A, __trace?: string): <R, E>(as: NA.NonEmptyArray<Effect<R, E, A>>) => Effect<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */
export declare function reduceAllParN_<R, E, A>(as: NA.NonEmptyArray<Effect<R, E, A>>, n: number, f: (acc: A, a: A) => A, __trace?: string): Effect<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */
export declare function reduceAllParN<A>(n: number, f: (acc: A, a: A) => A, __trace?: string): <R, E>(as: NA.NonEmptyArray<Effect<R, E, A>>) => Effect<R, E, A>;
//# sourceMappingURL=reduceAll.d.ts.map