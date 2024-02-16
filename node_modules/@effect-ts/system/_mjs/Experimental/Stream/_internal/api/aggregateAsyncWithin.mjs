import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as AggregateAsyncWithinEither from "./aggregateAsyncWithinEither.mjs";
import * as Collect from "./collect.mjs";
/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 */

export function aggregateAsyncWithin_(self, sink, schedule) {
  return Collect.collect_(AggregateAsyncWithinEither.aggregateAsyncWithinEither_(self, sink, schedule), E.fold(() => O.none, v => O.some(v)));
}
/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 *
 * @ets_data_first aggregateAsyncWithin_
 */

export function aggregateAsyncWithin(sink, schedule) {
  return self => aggregateAsyncWithin_(self, sink, schedule);
}
//# sourceMappingURL=aggregateAsyncWithin.mjs.map