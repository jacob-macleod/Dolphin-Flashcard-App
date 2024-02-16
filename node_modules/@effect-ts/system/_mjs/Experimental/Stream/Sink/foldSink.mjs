// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as AR from "../../../Support/AtomicReference/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function foldSink_(self, failure, success) {
  return new C.Sink(CH.foldChannel_(CH.doneCollect(self.channel), _ => failure(_).channel, ({
    tuple: [leftovers, z]
  }) => CH.suspend(() => {
    const leftoversRef = new AR.AtomicReference(CK.filter_(leftovers, a => !CK.isEmpty(a)));
    const refReader = CH.chain_(CH.succeedWith(() => leftoversRef.getAndSet(CK.empty())), chunk => CH.writeChunk(chunk));
    const passthrough = CH.identity();
    const continationSink = CH.zipRight_(refReader, passthrough)[">>>"](success(z).channel);
    return CH.chain_(CH.doneCollect(continationSink), ({
      tuple: [newLeftovers, z1]
    }) => CH.zipRight_(CH.chain_(CH.succeedWith(() => leftoversRef.get), _ => CH.writeChunk(_)), CH.as_(CH.writeChunk(newLeftovers), z1)));
  })));
}
/**
 *
 * @ets_data_first foldSink_
 */

export function foldSink(failure, success) {
  return self => foldSink_(self, failure, success);
}
//# sourceMappingURL=foldSink.mjs.map