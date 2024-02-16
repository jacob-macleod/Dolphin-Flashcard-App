import type * as C from "../core.js";
/**
 * Intersperse and also add a prefix and a suffix
 */
export declare function intersperseAffixes_<R, E, A, A1>(self: C.Stream<R, E, A>, start: A1, middle: A1, end: A1): C.Stream<R, E, A1 | A>;
/**
 * Intersperse and also add a prefix and a suffix
 *
 * @ets_data_first intersperseAffixes_
 */
export declare function intersperseAffixes<A1>(start: A1, middle: A1, end: A1): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1 | A>;
//# sourceMappingURL=intersperseAffixes.d.ts.map