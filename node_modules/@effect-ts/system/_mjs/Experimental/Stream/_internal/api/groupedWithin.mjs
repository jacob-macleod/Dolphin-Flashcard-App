import * as SC from "../../../../Schedule/index.mjs";
import * as SK from "../../Sink/index.mjs";
import * as AggregateAsyncWithin from "./aggregateAsyncWithin.mjs";
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */

export function groupedWithin_(self, chunkSize, within) {
  return AggregateAsyncWithin.aggregateAsyncWithin_(self, SK.collectAllN(chunkSize), SC.spaced(within));
}
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 *
 * @ets_data_first groupedWithin_
 */

export function groupedWithin(chunkSize, within) {
  return self => groupedWithin_(self, chunkSize, within);
}
//# sourceMappingURL=groupedWithin.mjs.map