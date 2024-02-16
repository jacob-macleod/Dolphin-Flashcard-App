import * as C from "../core.mjs";
import * as DoneCollect from "./doneCollect.mjs";
/**
 * Returns a new channel that collects the output and terminal value of this channel, which it
 * then writes as output of the returned channel.
 */

export function emitCollect(self) {
  return C.chain_(DoneCollect.doneCollect(self), t => C.write(t));
}
//# sourceMappingURL=emitCollect.mjs.map