// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CollectWhile from "./collectWhile.mjs";
/**
 * Terminates the stream when encountering the first `Left`.
 */

export function collectWhileRight(self) {
  return CollectWhile.collectWhile_(self, E.fold(() => O.none, r => O.some(r)));
}
//# sourceMappingURL=collectWhileRight.mjs.map