// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that immediately ends with the specified value.
 */

export function succeed(z) {
  return new C.Sink(CH.succeed(z));
}
//# sourceMappingURL=succeed.mjs.map