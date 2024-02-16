// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Fails with given error 'e' if value is `Left`.
 */

export function rightOrFail_(self, e) {
  return MapEffect.mapEffect_(self, E.fold(() => T.fail(e()), _ => T.succeed(_)));
}
/**
 * Fails with given error 'e' if value is `Left`.
 *
 * @ets_data_first rightOrFail_
 */

export function rightOrFail(e) {
  return self => rightOrFail_(self, e);
}
//# sourceMappingURL=rightOrFail.mjs.map