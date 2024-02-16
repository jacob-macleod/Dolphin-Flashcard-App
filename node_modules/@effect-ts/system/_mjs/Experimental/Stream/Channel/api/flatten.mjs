// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as C from "../core.mjs";
/**
 * Returns a new channel, which flattens the terminal value of this channel. This function may
 * only be called if the terminal value of this channel is another channel of compatible types.
 */

export function flatten(self) {
  return C.chain_(self, identity);
}
//# sourceMappingURL=flatten.mjs.map