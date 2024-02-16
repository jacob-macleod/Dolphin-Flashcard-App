// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Zips each element with the next element if present.
 */

export function zipWithNext(self) {
  return new Stream(M.map_(M.let_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "ref", () => T.toManaged(Ref.makeRef(O.none))), "last", ({
    ref
  }) => T.map_(T.map_(T.some(Ref.getAndSet_(ref, O.none)), _ => Tp.tuple(_, O.none)), A.single)), "pull", ({
    chunks,
    ref
  }) => {
    return T.map_(T.bind_(T.tap_(T.let_(T.bind_(T.bind_(T.do, "prev", () => ref.get), "chunk", () => chunks), "sc", ({
      chunk,
      prev
    }) => A.mapAccum_(chunk, prev, (prev, curr) => Tp.tuple(O.some(curr), O.map_(prev, _ => Tp.tuple(_, curr))))), ({
      sc
    }) => ref.set(sc.get(0))), "result", ({
      sc
    }) => Pull.emitChunk(A.collect_(sc.get(1), O.fold(() => O.none, ({
      tuple: [prev, curr]
    }) => O.some(Tp.tuple(prev, O.some(curr))))))), ({
      result
    }) => result);
  }), ({
    last,
    pull
  }) => T.orElseOptional_(pull, () => last)));
}
//# sourceMappingURL=zipWithNext.mjs.map