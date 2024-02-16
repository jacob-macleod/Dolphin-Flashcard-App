// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as CatchAll from "./catchAll.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */

export function catchSome_(self, pf) {
  return CatchAll.catchAll_(self, e => O.fold_(pf(e), () => fail(e), _ => _));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 *
 * @ets_data_first catchSome_
 */

export function catchSome(pf) {
  return self => catchSome_(self, pf);
}
//# sourceMappingURL=catchSome.mjs.map