// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { collectWhileMap_ } from "./collectWhileMap.mjs";
/**
 * Terminates the stream when encountering the first `None`.
 */

export function collectWhileSome(self) {
  return collectWhileMap_(self, identity);
}
//# sourceMappingURL=collectWhileSome.mjs.map