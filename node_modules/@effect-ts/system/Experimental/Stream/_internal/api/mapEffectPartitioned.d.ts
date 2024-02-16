import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 */
export declare function mapEffectPartitioned_<R, R1, E, E1, A, A1, K>(self: C.Stream<R, E, A>, keyBy: (a: A) => K, f: (a: A) => T.Effect<R1, E1, A1>, buffer?: number): C.Stream<R & R1, E | E1, A1>;
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 *
 * @ets_data_first mapEffectPartitioned_
 */
export declare function mapEffectPartitioned<R1, E1, A, A1, K>(keyBy: (a: A) => K, f: (a: A) => T.Effect<R1, E1, A1>, buffer?: number): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=mapEffectPartitioned.d.ts.map