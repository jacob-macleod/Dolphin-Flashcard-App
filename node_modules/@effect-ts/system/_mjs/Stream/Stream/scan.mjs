// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { scanM } from "./scanM.mjs";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 */

export function scan(s) {
  return f => self => scanM(s)((s, a) => T.succeed(f(s, a)))(self);
}
//# sourceMappingURL=scan.mjs.map