import * as C from "../core.mjs";
export function ensuring_(self, finalizer) {
  return C.ensuringWith_(self, _ => finalizer);
}
/**
 * @ets_data_first ensuring_
 */

export function ensuring(finalizer) {
  return self => ensuring_(self, finalizer);
}
//# sourceMappingURL=ensuring.mjs.map