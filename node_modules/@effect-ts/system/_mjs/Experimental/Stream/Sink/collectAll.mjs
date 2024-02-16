// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";

function collectLoop(state) {
  return CH.readWithCause(i => collectLoop(CK.concat_(state, i)), CH.failCause, _ => CH.end(state));
}
/**
 * A sink that collects all of its inputs into a chunk.
 */


export function collectAll() {
  return new C.Sink(collectLoop(CK.empty()));
}
//# sourceMappingURL=collectAll.mjs.map