// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Constructs a stream from a range of integers (lower bound included, upper bound not included)
 */

export function range(min, max, chunkSize = C.DEFAULT_CHUNK_SIZE) {
  const go = current => {
    const remaining = max - current;

    if (remaining > chunkSize) {
      return CH.zipRight_(CH.write(CK.range(current, current + chunkSize)), go(current + chunkSize));
    } else {
      return CH.write(CK.range(current, current + remaining));
    }
  };

  return new C.Stream(go(min));
}
//# sourceMappingURL=range.mjs.map