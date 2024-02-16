import type { Effect } from "./effect.js";
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */
export declare function mergeAll<A, B>(zero: B, f: (b: B, a: A) => B, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */
export declare function mergeAll_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, zero: B, f: (b: B, a: A) => B, __trace?: string): Effect<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllPar_
 */
export declare function mergeAllPar<A, B>(zero: B, f: (b: B, a: A) => B, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */
export declare function mergeAllPar_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, zero: B, f: (b: B, a: A) => B, __trace?: string): Effect<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllParN_
 */
export declare function mergeAllParN<A, B>(n: number, zero: B, f: (b: B, a: A) => B, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */
export declare function mergeAllParN_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, n: number, zero: B, f: (b: B, a: A) => B, __trace?: string): Effect<R, E, B>;
//# sourceMappingURL=mergeAll.d.ts.map