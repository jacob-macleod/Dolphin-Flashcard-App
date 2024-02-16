// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as O from "../../../../Option/index.mjs";
import { RingBufferNew } from "../../../../Support/RingBufferNew/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Chain from "./chain.mjs";
import * as Die from "./die.mjs";
import * as SucceedWith from "./succeedWith.mjs";
/**
 * Emits a sliding window of n elements.
 */

export function sliding_(self, chunkSize, stepSize = 1) {
  if (chunkSize <= 0 || stepSize <= 0) {
    return Die.die(new CS.IllegalArgumentException("invalid bounds. `chunkSize` and `stepSize` must be greater than zero"));
  }

  return Chain.chain_(SucceedWith.succeedWith(() => new RingBufferNew(chunkSize)), queue => {
    const emitOnStreamEnd = (queueSize, channelEnd) => {
      if (queueSize < chunkSize) {
        const items = queue.toChunk();
        const result = CK.isEmpty(items) ? CK.empty() : CK.single(items);
        return CH.zipRight_(CH.write(result), channelEnd);
      } else {
        const lastEmitIndex = queueSize - (queueSize - chunkSize) % stepSize;

        if (lastEmitIndex === queueSize) {
          return channelEnd;
        } else {
          const leftovers = queueSize - (lastEmitIndex - chunkSize + stepSize);
          const lastItems = CK.takeRight_(queue.toChunk(), leftovers);
          const result = CK.isEmpty(lastItems) ? CK.empty() : CK.single(lastItems);
          return CH.zipRight_(CH.write(result), channelEnd);
        }
      }
    };

    const reader = queueSize => CH.readWithCause(in_ => CH.zipRight_(CH.write(CK.collect_(CK.zipWithIndex(in_), ({
      tuple: [i, idx]
    }) => {
      queue.put(i);
      const currentIndex = queueSize + idx + 1;

      if (currentIndex < chunkSize || (currentIndex - chunkSize) % stepSize > 0) {
        return O.none;
      } else {
        return O.some(queue.toChunk());
      }
    })), reader(queueSize + CK.size(in_))), cause => emitOnStreamEnd(queueSize, CH.failCause(cause)), _ => emitOnStreamEnd(queueSize, CH.unit));

    return new C.Stream(self.channel[">>>"](reader(0)));
  });
}
/**
 * Emits a sliding window of n elements.
 *
 * @ets_data_first sliding_
 */

export function sliding(chunkSize, stepSize = 1) {
  return self => sliding_(self, chunkSize, stepSize);
}
//# sourceMappingURL=sliding.mjs.map