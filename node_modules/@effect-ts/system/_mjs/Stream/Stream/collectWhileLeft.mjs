// ets_tracing: off
import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { collectWhileMap_ } from "./collectWhileMap.mjs";
/**
 * Terminates the stream when encountering the first `Right`.
 */

export function collectWhileLeft(self) {
  return collectWhileMap_(self, E.fold(a => O.some(a), _ => O.none));
}
//# sourceMappingURL=collectWhileLeft.mjs.map