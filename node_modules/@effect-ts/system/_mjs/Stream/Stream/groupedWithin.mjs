import * as SC from "../../Schedule/index.mjs";
import * as TR from "../Transducer/index.mjs";
import { aggregateAsyncWithin_ } from "./aggregateAsyncWithin.mjs";
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */

export function groupedWithin_(self, chunkSize, within) {
  return aggregateAsyncWithin_(self, TR.collectAllN(chunkSize), SC.spaced(within));
}
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */

export function groupedWithin(chunkSize, within) {
  return self => groupedWithin_(self, chunkSize, within);
}
//# sourceMappingURL=groupedWithin.mjs.map