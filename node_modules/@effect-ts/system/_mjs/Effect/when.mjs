// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * The moral equivalent of `if (p) exp`
 */

export function when_(self, predicate, __trace) {
  return predicate() ? map_(self, O.some, __trace) : succeed(O.none, __trace);
}
/**
 * The moral equivalent of `if (p) exp`
 *
 * @ets_data_first when_
 */

export function when(predicate, __trace) {
  return self => when_(self, predicate, __trace);
}
//# sourceMappingURL=when.mjs.map