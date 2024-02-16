// ets_tracing: off
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
/**
 * Maps the output of this channel using f
 */

export function mapOut_(self, f) {
  const reader = ReadWith.readWith(i => C.chain_(C.write(f(i)), () => reader), C.fail, C.end);
  return self[">>>"](reader);
}
/**
 * Maps the output of this channel using f
 *
 * @ets_data_first mapOut_
 */

export function mapOut(f) {
  return self => mapOut_(self, f);
}
//# sourceMappingURL=mapOut.mjs.map