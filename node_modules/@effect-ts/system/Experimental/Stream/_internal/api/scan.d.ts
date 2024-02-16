import type * as C from "../core.js";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 */
export declare function scan_<R, E, A, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => S): C.Stream<R, E, S>;
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 *
 * @ets_data_first scan_
 */
export declare function scan<A, S>(s: S, f: (s: S, a: A) => S): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, S>;
//# sourceMappingURL=scan.d.ts.map