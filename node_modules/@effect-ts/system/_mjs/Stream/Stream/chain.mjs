// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Finalizer from "../../Managed/ReleaseMap/finalizer.mjs";
import * as Ref from "../../Ref/index.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import { Chain, Stream } from "./definitions.mjs";
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */

export function chain_(self, f0) {
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "outerStream", () => self.proc), "currOuterChunk", () => M.fromEffect(Ref.makeRef(Tp.tuple(A.empty(), 0)))), "currInnerStream", () => M.fromEffect(Ref.makeRef(Pull.end))), "innerFinalizer", () => M.finalizerRef(Finalizer.noopFinalizer)), ({
    currInnerStream,
    currOuterChunk,
    innerFinalizer,
    outerStream
  }) => new Chain(f0, outerStream, currOuterChunk, currInnerStream, innerFinalizer).apply()));
}
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */

export function chain(f0) {
  return self => chain_(self, f0);
}
//# sourceMappingURL=chain.mjs.map