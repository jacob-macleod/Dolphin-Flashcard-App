// ets_tracing: off
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */

export function someOrFail_(self, f) {
  return mapM_(self, O.fold(() => T.fail(f()), _ => T.succeed(_)));
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */

export function someOrFail(f) {
  return self => someOrFail_(self, f);
}
//# sourceMappingURL=someOrFail.mjs.map