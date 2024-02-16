// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Empty from "./empty.mjs";
import * as FromChunk from "./fromChunk.mjs";
/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 */

export function branchAfter_(self, n, f) {
  const collecting = buf => CH.readWithCause(chunk => {
    const newBuf = CK.concat_(buf, chunk);

    if (CK.size(newBuf) >= n) {
      const {
        tuple: [is, is1]
      } = CK.splitAt_(newBuf, n);
      const pipeline = f(is);
      return CH.zipRight_(pipeline(FromChunk.fromChunk(is1)).channel, emitting(pipeline));
    } else {
      return collecting(newBuf);
    }
  }, _ => CH.failCause(_), _ => {
    if (CK.isEmpty(buf)) {
      return CH.unit;
    } else {
      const pipeline = f(buf);
      return pipeline(Empty.empty).channel;
    }
  });

  const emitting = pipeline => CH.readWithCause(chunk => CH.zipRight_(pipeline(FromChunk.fromChunk(chunk)).channel, emitting(pipeline)), _ => CH.failCause(_), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](collecting(CK.empty())));
}
/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 *
 * @ets_data_first branchAfter_
 */

export function branchAfter(n, f) {
  return self => branchAfter_(self, n, f);
}
//# sourceMappingURL=branchAfter.mjs.map