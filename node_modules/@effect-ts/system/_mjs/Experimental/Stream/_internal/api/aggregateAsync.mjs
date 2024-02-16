import * as SC from "../../../../Schedule/index.mjs";
import * as AggregateAsyncWithin from "./aggregateAsyncWithin.mjs";
/**
 * Aggregates elements of this stream using the provided sink for as long
 * as the downstream operators on the stream are busy.
 *
 * This operator divides the stream into two asynchronous "islands". Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Whenever
 * the downstream fiber is busy processing elements, the upstream fiber will feed elements
 * into the sink until it signals completion.
 *
 * Any sink can be used here, but see `Sink.foldWeightedM` and `Sink.foldUntilM` for
 * sinks that cover the common usecases.
 */

export function aggregateAsync_(self, sink) {
  return AggregateAsyncWithin.aggregateAsyncWithin_(self, sink, SC.forever);
}
/**
 * Aggregates elements of this stream using the provided sink for as long
 * as the downstream operators on the stream are busy.
 *
 * This operator divides the stream into two asynchronous "islands". Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Whenever
 * the downstream fiber is busy processing elements, the upstream fiber will feed elements
 * into the sink until it signals completion.
 *
 * Any sink can be used here, but see `Sink.foldWeightedM` and `Sink.foldUntilM` for
 * sinks that cover the common usecases.
 *
 * @ets_data_first aggregateAsync_
 */

export function aggregateAsync(sink) {
  return self => aggregateAsync_(self, sink);
}
//# sourceMappingURL=aggregateAsync.mjs.map