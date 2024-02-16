import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Loops over the stream chunks concatenating the result of f
 */

export function loopOnChunks_(self, f) {
  const loop = CH.readWith(chunk => CH.chain_(f(chunk), cont => cont ? loop : CH.end(false)), CH.fail, _ => CH.succeed(false));
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Loops over the stream chunks concatenating the result of f
 *
 * @ets_data_first loopOnChunks_
 */

export function loopOnChunks(f) {
  return self => loopOnChunks_(self, f);
}
//# sourceMappingURL=loopOnChunks.mjs.map