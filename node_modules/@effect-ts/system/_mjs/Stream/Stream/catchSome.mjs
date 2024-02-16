// ets_tracing: off
import * as O from "../../Option/index.mjs";
import { catchAll_ } from "./catchAll.mjs";
import { fail } from "./fail.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */

export function catchSome_(self, f) {
  return catchAll_(self, e => O.getOrElse_(f(e), () => fail(e)));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */

export function catchSome(f) {
  return self => catchSome_(self, f);
}
//# sourceMappingURL=catchSome.mjs.map