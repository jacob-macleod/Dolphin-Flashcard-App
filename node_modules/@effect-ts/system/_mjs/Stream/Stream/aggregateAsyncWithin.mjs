import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { aggregateAsyncWithinEither_ } from "./aggregateAsyncWithinEither.mjs";
import { filterMap_ } from "./filterMap.mjs";
/**
 * Uses `aggregateAsyncWithinEither` but only returns the `Right` results.
 */

export function aggregateAsyncWithin(transducer, schedule) {
  return self => aggregateAsyncWithin_(self, transducer, schedule);
}
/**
 * Uses `aggregateAsyncWithinEither` but only returns the `Right` results.
 */

export function aggregateAsyncWithin_(self, transducer, schedule) {
  return filterMap_(aggregateAsyncWithinEither_(self, transducer, schedule), E.fold(() => O.none, O.some));
}
//# sourceMappingURL=aggregateAsyncWithin.mjs.map