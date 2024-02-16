import type { Stream } from "./definitions.js";
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
export declare function groupByKey_<R, E, O, K>(self: Stream<R, E, O>, f: (o: O) => K, buffer?: number): import("../GroupBy/index.js").GroupBy<R, E, K, O>;
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
export declare function groupByKey<O, K>(f: (o: O) => K, buffer?: number): <R, E>(self: Stream<R, E, O>) => import("../GroupBy/index.js").GroupBy<R, E, K, O>;
//# sourceMappingURL=groupByKey.d.ts.map