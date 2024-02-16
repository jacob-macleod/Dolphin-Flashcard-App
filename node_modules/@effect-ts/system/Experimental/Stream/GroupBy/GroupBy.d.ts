import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../Effect/index.js";
import type { Predicate } from "../../../Function/index.js";
import type * as C from "../_internal/core.js";
export declare abstract class GroupBy<R, E, K, V, A> {
    readonly _R: (_: R) => void;
    readonly _E: () => E;
    readonly _K: () => K;
    readonly _V: () => V;
    readonly _A: () => A;
}
export declare type UniqueKey = number;
export declare function make_<R, E, K, V, A>(stream: C.Stream<R, E, A>, key: (a: A) => T.Effect<R, E, Tp.Tuple<[K, V]>>, buffer: number): GroupBy<R, E, K, V, A>;
/**
 * @ets_data_first make_
 */
export declare function make<R, E, K, V, A>(key: (a: A) => T.Effect<R, E, Tp.Tuple<[K, V]>>, buffer: number): (stream: C.Stream<R, E, A>) => GroupBy<R, E, K, V, A>;
/**
 * Only consider the first n groups found in the stream.
 */
export declare function filter_<R, E, K, V, A>(self: GroupBy<R, E, K, V, A>, f: Predicate<K>): GroupBy<R, E, K, V, A>;
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first filter_
 */
export declare function filter<K>(f: Predicate<K>): <R, E, V, A>(self: GroupBy<R, E, K, V, A>) => GroupBy<R, E, K, V, A>;
/**
 * Only consider the first n groups found in the stream.
 */
export declare function first_<R, E, K, V, A>(self: GroupBy<R, E, K, V, A>, n: number): GroupBy<R, E, K, V, A>;
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first first_
 */
export declare function first(n: number): <R, E, K, V, A>(self: GroupBy<R, E, K, V, A>) => GroupBy<R, E, K, V, A>;
export declare function mergeGroupBy_<R, R1, E, E1, K, V, A, A1>(self: GroupBy<R, E, K, V, A>, f: (k: K, stream: C.Stream<unknown, E, V>) => C.Stream<R1, E1, A1>): C.Stream<R & R1, E | E1, A1>;
/**
 * @ets_data_first mergeGroupBy_
 */
export declare function mergeGroupBy<R1, E, E1, K, V, A, A1>(f: (k: K, stream: C.Stream<unknown, E, V>) => C.Stream<R1, E1, A1>): <R>(self: GroupBy<R, E, K, V, A>) => C.Stream<R & R1, E | E1, A1>;
//# sourceMappingURL=GroupBy.d.ts.map