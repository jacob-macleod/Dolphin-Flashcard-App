// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as Pull from "../Pull/index.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from a {@link XQueue} of values
 */

export function fromQueue(queue) {
  return repeatEffectChunkOption(T.catchAllCause_(Q.takeBetween_(queue, 1, Number.MAX_SAFE_INTEGER), c => T.chain_(Q.isShutdown(queue), down => down && C.interrupted(c) ? Pull.end : Pull.halt(c))));
}
//# sourceMappingURL=fromQueue.mjs.map