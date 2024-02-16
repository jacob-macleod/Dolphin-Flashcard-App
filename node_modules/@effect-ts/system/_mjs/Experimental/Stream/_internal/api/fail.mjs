// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Halt a stream with the specified error
 */

export function fail(error) {
  return new C.Stream(CH.fail(error));
}
//# sourceMappingURL=fail.mjs.map