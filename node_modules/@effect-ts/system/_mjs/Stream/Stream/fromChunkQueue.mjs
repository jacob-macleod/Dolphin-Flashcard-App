// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as Pull from "../Pull/index.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from a {@link XQueue} of values
 */

export function fromChunkQueue(queue) {
  return repeatEffectChunkOption(T.catchAllCause_(Q.take(queue), c => T.chain_(Q.isShutdown(queue), down => down && C.interrupted(c) ? Pull.end : Pull.halt(c))));
}
//# sourceMappingURL=fromChunkQueue.mjs.map