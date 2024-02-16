// ets_tracing: off
import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { collectWhileMap_ } from "./collectWhileMap.mjs";
/**
 * Terminates the stream when encountering the first `Left`.
 */

export function collectWhileRight(self) {
  return collectWhileMap_(self, E.fold(_ => O.none, a => O.some(a)));
}
//# sourceMappingURL=collectWhileRight.mjs.map