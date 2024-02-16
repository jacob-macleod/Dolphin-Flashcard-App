import type * as C from "../core.js";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 */
export declare function crossWith_<R, R1, E, E1, A, A1, C>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => C): C.Stream<R & R1, E | E1, C>;
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * @ets_data_first crossWith_
 */
export declare function crossWith<R1, E1, A, A1, C>(that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => C): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, C>;
//# sourceMappingURL=crossWith.d.ts.map