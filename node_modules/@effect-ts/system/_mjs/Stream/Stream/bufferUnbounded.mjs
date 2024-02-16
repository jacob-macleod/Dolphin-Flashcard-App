// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as Ref from "../../Ref/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import * as Take from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
import { toQueueUnbounded } from "./toQueueUnbounded.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * elements into an unbounded queue.
 */

export function bufferUnbounded(self) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "done", () => T.toManaged(Ref.makeRef(true))), "queue", () => toQueueUnbounded(self)), ({
    done,
    queue
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(Q.take(queue), Take.foldM(() => T.zipRight_(done.set(true), Pull.end), Pull.halt, Pull.emitChunk));
    }
  })));
}
//# sourceMappingURL=bufferUnbounded.mjs.map