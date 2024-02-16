import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */

export function ensuring_(self, fin) {
  return new C.Stream(CH.ensuring_(self.channel, fin));
}
/**
 * Executes the provided finalizer after this stream's finalizers run.
 *
 * @ets_data_first ensuring_
 */

export function ensuring(fin) {
  return self => ensuring_(self, fin);
}
//# sourceMappingURL=ensuring.mjs.map