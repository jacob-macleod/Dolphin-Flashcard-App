import { groupByKey_ } from "./groupByKey.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 */

export function mapMPartitioned(keyBy, f, buffer = 16) {
  return self => groupByKey_(self, keyBy, buffer).merge((_, s) => mapM_(s, f));
}
//# sourceMappingURL=mapMPartitioned.mjs.map