import * as GroupByKey from "./groupByKey.mjs";
import * as MapEffect from "./mapEffect.mjs";
import * as MergeGroupBy from "./mergeGroupBy.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 */

export function mapEffectPartitioned_(self, keyBy, f, buffer = 16) {
  return MergeGroupBy.mergeGroupBy_(GroupByKey.groupByKey_(self, keyBy, buffer), (_, s) => MapEffect.mapEffect_(s, f));
}
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 *
 * @ets_data_first mapEffectPartitioned_
 */

export function mapEffectPartitioned(keyBy, f, buffer = 16) {
  return self => mapEffectPartitioned_(self, keyBy, f, buffer);
}
//# sourceMappingURL=mapEffectPartitioned.mjs.map