// ets_tracing: off
import * as Chain from "./chain.mjs";
import * as Map from "./map.mjs";
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */

export function zipWith_(self, that, f) {
  return Chain.chain_(self, z => Map.map_(that, _ => f(z, _)));
}
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.mjs.map