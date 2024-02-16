// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { forEach } from "./forEach.mjs";
/**
 * Runs the stream and collects all of its elements to an array.
 */

export function runDrain(self) {
  return forEach(_ => T.unit)(self);
}
//# sourceMappingURL=runDrain.mjs.map