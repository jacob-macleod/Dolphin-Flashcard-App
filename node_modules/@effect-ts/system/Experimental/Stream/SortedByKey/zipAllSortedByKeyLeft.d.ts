import type * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import type * as OD from "../../../Ord/index.js";
import type * as S from "../_internal/core.js";
import type * as C from "./core.js";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from this stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */
export declare function zipAllSortedByKeyLeft_<R, R1, E, E1, K, A, B>(self: C.SortedByKey<R, E, K, A>, that: S.Stream<R1, E1, Tp.Tuple<[K, B]>>, default_: A, ord: OD.Ord<K>): S.Stream<R & R1, E | E1, Tp.Tuple<[K, A]>>;
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from this stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKeyLeft_
 */
export declare function zipAllSortedByKeyLeft<R1, E1, K, A, B>(that: S.Stream<R1, E1, Tp.Tuple<[K, B]>>, default_: A, ord: OD.Ord<K>): <R, E>(self: C.SortedByKey<R, E, K, A>) => S.Stream<R & R1, E1 | E, Tp.Tuple<[K, A]>>;
//# sourceMappingURL=zipAllSortedByKeyLeft.d.ts.map