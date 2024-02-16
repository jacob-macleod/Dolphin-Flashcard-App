import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../Effect/index.js";
import type * as OD from "../../../Ord/index.js";
import type * as S from "../_internal/core.js";
import type * as C from "./core.js";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 */
export declare function zipAllSortedByKeyWithExec_<R, R1, E, E1, K, A, B, C1, C2, C3>(self: C.SortedByKey<R, E, K, A>, that: C.SortedByKey<R1, E1, K, B>, left: (a: A) => C1, right: (b: B) => C2, both: (a: A, b: B) => C3, ord: OD.Ord<K>, exec: T.ExecutionStrategy): S.Stream<R & R1, E | E1, Tp.Tuple<[K, C1 | C2 | C3]>>;
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 *
 * @ets_data_first zipAllSortedByKeyWithExec_
 */
export declare function zipAllSortedByKeyWithExec<R1, E1, K, A, B, C1, C2, C3>(that: C.SortedByKey<R1, E1, K, B>, left: (a: A) => C1, right: (b: B) => C2, both: (a: A, b: B) => C3, ord: OD.Ord<K>, exec: T.ExecutionStrategy): <R, E>(self: C.SortedByKey<R, E, K, A>) => S.Stream<R & R1, E1 | E, Tp.Tuple<[K, C1 | C2 | C3]>>;
//# sourceMappingURL=zipAllSortedByKeyWithExec.d.ts.map