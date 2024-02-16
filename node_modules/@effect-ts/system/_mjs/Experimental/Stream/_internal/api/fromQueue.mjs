// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as Pull from "../../Pull/index.mjs";
import * as C from "../core.mjs";
import * as RepeatEffectChunkOption from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from a `XQueue` of values
 */

export function fromQueue_(queue, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return RepeatEffectChunkOption.repeatEffectChunkOption(T.catchAllCause_(T.map_(Q.takeBetween_(queue, 1, maxChunkSize), CK.from), c => T.chain_(Q.isShutdown(queue), down => {
    if (down && CS.interrupted(c)) {
      return Pull.end;
    } else {
      return Pull.failCause(c);
    }
  })));
}
/**
 * Creates a stream from a `XQueue` of values
 */

export function fromQueue(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return queue => fromQueue_(queue, maxChunkSize);
}
//# sourceMappingURL=fromQueue.mjs.map