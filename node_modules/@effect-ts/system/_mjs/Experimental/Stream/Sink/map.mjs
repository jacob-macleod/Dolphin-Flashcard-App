// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Transforms this sink's result.
 */

export function map_(self, f) {
  return new C.Sink(CH.map_(self.channel, f));
}
/**
 * Transforms this sink's result.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.mjs.map