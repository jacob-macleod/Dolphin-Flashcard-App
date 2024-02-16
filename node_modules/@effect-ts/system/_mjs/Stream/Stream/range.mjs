// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { DefaultChunkSize, Stream } from "./definitions.mjs";
/**
 * Constructs a stream from a range of integers (lower bound included, upper bound not included)
 */

export function range(min, max, chunkSize = DefaultChunkSize) {
  const pull = ref => T.map_(T.tap_(T.bind_(T.do, "start", () => Ref.getAndUpdate_(ref, _ => _ + chunkSize)), ({
    start
  }) => T.when_(T.fail(O.none), () => start >= max + 1)), ({
    start
  }) => A.range(start, Math.min(start + chunkSize, max)));

  return new Stream(M.map_(Ref.makeManagedRef(min), pull));
}
//# sourceMappingURL=range.mjs.map