import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import type * as OD from "../../../Ord/index.js";
import type * as S from "../_internal/core.js";
import type * as C from "./core.js";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */
export declare function zipAllSortedByKey_<R, R1, E, E1, K, A, B>(self: C.SortedByKey<R, E, K, A>, that: S.Stream<R1, E1, Tp.Tuple<[K, B]>>, defaultLeft: A, defaultRight: B, ord: OD.Ord<K>): S.Stream<R & R1, E | E1, Tp.Tuple<[K, Tp.Tuple<[A, B]>]>>;
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKey_
 */
export declare function zipAllSortedByKey<R1, E1, K, A, B>(that: S.Stream<R1, E1, Tp.Tuple<[K, B]>>, defaultLeft: A, defaultRight: B, ord: OD.Ord<K>): <R, E>(self: C.SortedByKey<R, E, K, A>) => S.Stream<R & R1, E1 | E, Tp.Tuple<[K, Tp.Tuple<[A, B]>]>>;
//# sourceMappingURL=zipAllSortedByKey.d.ts.map