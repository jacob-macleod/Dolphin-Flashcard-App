// ets_tracing: off
import * as C from "../core.mjs";
import * as CatchAll from "./catchAll.mjs";
export function orDieWith_(self, f) {
  return CatchAll.catchAll_(self, e => C.die(f(e)));
}
/**
 * @ets_data_first orDieWith_
 */

export function orDieWith(f) {
  return self => orDieWith_(self, f);
}
//# sourceMappingURL=orDieWith.mjs.map