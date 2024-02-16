// ets_tracing: off
import * as E from "../../Either/index.mjs";
import * as T from "../_internal/effect.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Fails with given error 'e' if value is `Left`.
 */

export function rightOrFail_(self, e) {
  return mapM_(self, E.fold(_ => T.fail(e), _ => T.succeed(_)));
}
/**
 * Fails with given error 'e' if value is `Left`.
 */

export function rightOrFail(e) {
  return self => rightOrFail_(self, e);
}
//# sourceMappingURL=rightOrFail.mjs.map