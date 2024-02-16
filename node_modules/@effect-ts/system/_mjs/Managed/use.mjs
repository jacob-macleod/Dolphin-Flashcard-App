// ets_tracing: off
import { managedUse_ as use_ } from "../Effect/excl-forEach.mjs";
/**
 * Run an effect while acquiring the resource before and releasing it after
 *
 * @ets_data_first use_
 */

export function use(f, __trace) {
  return self => use_(self, f, __trace);
}
export { use_ };
//# sourceMappingURL=use.mjs.map