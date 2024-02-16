import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function managed_(resource, fn) {
  return new C.Sink(CH.managed_(resource, _ => fn(_).channel));
}
/**
 *
 * @ets_data_first managed_
 */

export function managed(fn) {
  return resource => managed_(resource, fn);
}
//# sourceMappingURL=managed.mjs.map