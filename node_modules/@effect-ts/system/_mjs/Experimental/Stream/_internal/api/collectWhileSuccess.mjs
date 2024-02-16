// ets_tracing: off
import * as Ex from "../../../../Exit/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CollectWhile from "./collectWhile.mjs";
/**
 * Terminates the stream when encountering the first `Exit.Failure`.
 */

export function collectWhileSuccess(self) {
  return CollectWhile.collectWhile_(self, Ex.fold(() => O.none, r => O.some(r)));
}
//# sourceMappingURL=collectWhileSuccess.mjs.map