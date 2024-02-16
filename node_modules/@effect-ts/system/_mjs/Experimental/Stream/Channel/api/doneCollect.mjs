// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

function doneCollectReader(builder) {
  return ReadWith.readWith(out => ZipRight.zipRight_(C.succeedWith(() => {
    builder.append(out);
  }), doneCollectReader(builder)), err => C.fail(err), done => C.end(done));
}
/**
 * Returns a new channel, which is the same as this one, except that all the outputs are
 * collected and bundled into a tuple together with the terminal value of this channel.
 *
 * As the channel returned from this channel collect's all of this channel's output into an in-
 * memory chunk, it is not safe to call this method on channels that output a large or unbounded
 * number of values.
 */


export function doneCollect(self) {
  return C.suspend(() => {
    const builder = CK.builder();
    return C.chain_(C.pipeTo_(self, doneCollectReader(builder)), z => C.succeedWith(() => Tp.tuple(builder.build(), z)));
  });
}
//# sourceMappingURL=doneCollect.mjs.map