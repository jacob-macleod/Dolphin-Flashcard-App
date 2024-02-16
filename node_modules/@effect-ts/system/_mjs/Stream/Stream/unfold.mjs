import * as T from "../_internal/effect.mjs";
import { unfoldM } from "./unfoldM.mjs";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`
 */

export function unfold(s, f) {
  return unfoldM(s, s => T.succeed(f(s)));
}
//# sourceMappingURL=unfold.mjs.map