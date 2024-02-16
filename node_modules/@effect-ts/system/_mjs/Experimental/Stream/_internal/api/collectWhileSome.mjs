// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as CollectWhile from "./collectWhile.mjs";
/**
 * Terminates the stream when encountering the first `None`.
 */

export function collectWhileSome(self) {
  return CollectWhile.collectWhile_(self, identity);
}
//# sourceMappingURL=collectWhileSome.mjs.map