// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as GroupBy from "./groupBy.mjs";
/**
 * Partition a stream using a function and process each stream individually.
 * This returns a data structure that can be used
 * to further filter down which groups shall be processed.
 *
 * After calling apply on the GroupBy object, the remaining groups will be processed
 * in parallel and the resulting streams merged in a nondeterministic fashion.
 *
 * Up to `buffer` elements may be buffered in any group stream before the producer
 * is backpressured. Take care to consume from all streams in order
 * to prevent deadlocks.

 */

export function groupByKey_(self, f, buffer = 16) {
  return GroupBy.groupBy_(self, a => T.succeed(Tp.tuple(f(a), a)), buffer);
}
/**
 * Partition a stream using a function and process each stream individually.
 * This returns a data structure that can be used
 * to further filter down which groups shall be processed.
 *
 * After calling apply on the GroupBy object, the remaining groups will be processed
 * in parallel and the resulting streams merged in a nondeterministic fashion.
 *
 * Up to `buffer` elements may be buffered in any group stream before the producer
 * is backpressured. Take care to consume from all streams in order
 * to prevent deadlocks.
 *
 * @ets_data_first groupByKey_
 */

export function groupByKey(f, buffer = 16) {
  return self => groupByKey_(self, f, buffer);
}
//# sourceMappingURL=groupByKey.mjs.map