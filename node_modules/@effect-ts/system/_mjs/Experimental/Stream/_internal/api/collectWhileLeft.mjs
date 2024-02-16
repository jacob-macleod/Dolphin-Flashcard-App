// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CollectWhile from "./collectWhile.mjs";
/**
 * Terminates the stream when encountering the first `Right`.
 */

export function collectWhileLeft(self) {
  return CollectWhile.collectWhile_(self, E.fold(l => O.some(l), _ => O.none));
}
//# sourceMappingURL=collectWhileLeft.mjs.map