// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as RB from "../../../../Support/RingBufferNew/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Chain from "./chain.mjs";
import * as SucceedWith from "./succeedWith.mjs";
/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 */

export function dropRight_(self, n) {
  if (n <= 0) {
    return new C.Stream(self.channel);
  }

  return Chain.chain_(SucceedWith.succeedWith(() => new RB.RingBufferNew(n)), queue => {
    const reader = CH.readWith(in_ => {
      const outs = CK.collect_(in_, elem => {
        const head = queue.head();
        queue.put(elem);
        return head;
      });
      return CH.zipRight_(CH.write(outs), reader);
    }, _ => CH.fail(_), _ => CH.unit);
    return new C.Stream(self.channel[">>>"](reader));
  });
}
/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 *
 * @ets_data_first dropRight_
 */

export function dropRight(n) {
  return self => dropRight_(self, n);
}
//# sourceMappingURL=dropRight.mjs.map