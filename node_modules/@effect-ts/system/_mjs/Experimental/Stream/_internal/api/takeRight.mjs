// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as RB from "../../../../Support/RingBufferNew/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Empty from "./empty.mjs";
/**
 * Takes the last specified number of elements from this stream.
 */

export function takeRight_(self, n) {
  if (n <= 0) {
    return Empty.empty;
  }

  return new C.Stream(CH.unwrap(T.map_(T.bind_(T.do, "queue", () => T.succeedWith(() => new RB.RingBufferNew(n))), ({
    queue
  }) => {
    const reader = CH.readWith(in_ => {
      CK.forEach_(in_, _ => queue.put(_));
      return reader;
    }, _ => CH.fail(_), _ => CH.zipRight_(CH.write(queue.toChunk()), CH.unit));
    return self.channel[">>>"](reader);
  })));
}
/**
 * Takes the last specified number of elements from this stream.
 *
 * @ets_data_first takeRight_
 */

export function takeRight(n) {
  return self => takeRight_(self, n);
}
//# sourceMappingURL=takeRight.mjs.map