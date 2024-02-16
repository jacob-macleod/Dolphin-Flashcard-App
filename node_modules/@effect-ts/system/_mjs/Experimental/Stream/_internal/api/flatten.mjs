// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as Chain from "./chain.mjs";
/**
 * Flattens this stream-of-streams into a stream made of the concatenation in
 * strict order of all the streams.
 */

export function flatten(self) {
  return Chain.chain_(self, identity);
}
//# sourceMappingURL=flatten.mjs.map