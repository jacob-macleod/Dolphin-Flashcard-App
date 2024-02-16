import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
import * as C from "../core.mjs";
import * as ToQueueUnbounded from "./toQueueUnbounded.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * elements into an unbounded queue.
 */

export function bufferUnbounded(self) {
  const queue = ToQueueUnbounded.toQueueUnbounded(self);
  return new C.Stream(CH.managed_(queue, queue => {
    const process = CH.chain_(CH.fromEffect(Q.take(queue)), TK.fold(CH.end(undefined), error => CH.failCause(error), value => CH.zipRight_(CH.write(value), process)));
    return process;
  }));
}
//# sourceMappingURL=bufferUnbounded.mjs.map