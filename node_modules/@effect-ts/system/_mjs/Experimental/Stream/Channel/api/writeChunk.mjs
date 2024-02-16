// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as C from "../core.mjs";
import * as Unit from "./unit.mjs";
import * as ZipRight from "./zipRight.mjs";
export function writeChunk(outs) {
  const writer = (idx, len) => idx === len ? Unit.unit : ZipRight.zipRight_(C.write(CK.unsafeGet_(outs, idx)), writer(idx + 1, len));

  return writer(0, CK.size(outs));
}
//# sourceMappingURL=writeChunk.mjs.map