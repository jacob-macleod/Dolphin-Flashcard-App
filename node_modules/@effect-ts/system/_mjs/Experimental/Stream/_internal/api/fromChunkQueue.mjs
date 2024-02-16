// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as Pull from "../../Pull/index.mjs";
import * as RepeatEffectChunkOption from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from a queue of values
 */

export function fromChunkQueue(queue) {
  return RepeatEffectChunkOption.repeatEffectChunkOption(T.catchAllCause_(Q.take(queue), c => T.chain_(Q.isShutdown(queue), down => {
    if (down && CS.interrupted(c)) {
      return Pull.end;
    } else {
      return Pull.failCause(c);
    }
  })));
}
//# sourceMappingURL=fromChunkQueue.mjs.map