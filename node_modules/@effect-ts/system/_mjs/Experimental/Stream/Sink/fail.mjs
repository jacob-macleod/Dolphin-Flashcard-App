// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that always fails with the specified error.
 */

export function fail(e) {
  return new C.Sink(CH.fail(e));
}
//# sourceMappingURL=fail.mjs.map