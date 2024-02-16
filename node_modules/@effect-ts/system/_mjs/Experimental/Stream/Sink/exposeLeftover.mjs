// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function exposeLeftover(self) {
  return new C.Sink(CH.map_(CH.doneCollect(self.channel), ({
    tuple: [chunks, z]
  }) => Tp.tuple(z, CK.flatten(chunks))));
}
//# sourceMappingURL=exposeLeftover.mjs.map