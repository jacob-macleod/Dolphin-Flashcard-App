// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */

export function someOrFail_(self, e) {
  return MapEffect.mapEffect_(self, O.fold(() => T.fail(e()), _ => T.succeed(_)));
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */

export function someOrFail(e) {
  return self => someOrFail_(self, e);
}
//# sourceMappingURL=someOrFail.mjs.map