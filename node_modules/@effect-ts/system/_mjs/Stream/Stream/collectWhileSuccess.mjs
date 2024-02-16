// ets_tracing: off
import * as Ex from "../../Exit/index.mjs";
import * as O from "../../Option/index.mjs";
import { collectWhileMap_ } from "./collectWhileMap.mjs";
/**
 * Terminates the stream when encountering the first `Exit.Failure`.
 */

export function collectWhileSuccess(self) {
  return collectWhileMap_(self, Ex.fold(_ => O.none, a => O.some(a)));
}
//# sourceMappingURL=collectWhileSuccess.mjs.map