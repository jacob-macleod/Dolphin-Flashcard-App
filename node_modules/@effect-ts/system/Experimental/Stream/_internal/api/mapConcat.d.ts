import type * as C from "../core.js";
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */
export declare function mapConcat_<R, E, A, A1>(self: C.Stream<R, E, A>, f: (a: A) => Iterable<A1>): C.Stream<R, E, A1>;
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 *
 * @ets_data_first mapConcat_
 */
export declare function mapConcat<A, A1>(f: (a: A) => Iterable<A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=mapConcat.d.ts.map