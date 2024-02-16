// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as Ref from "../../../Ref/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */

export function untilOutputEffect_(self, f) {
  return new C.Sink(CH.chain_(CH.fromEffect(T.zip_(Ref.makeRef(CK.empty()), Ref.makeRef(false))), ({
    tuple: [leftoversRef, upstreamDoneRef]
  }) => {
    const upstreamMarker = CH.readWith(in_ => CH.zipRight_(CH.write(in_), upstreamMarker), _ => CH.fail(_), _ => CH.as_(CH.fromEffect(upstreamDoneRef.set(true)), _));
    const loop = CH.foldChannel_(CH.doneCollect(self.channel), CH.fail, ({
      tuple: [leftovers, doneValue]
    }) => CH.map_(CH.bind("res", ({
      satisfied,
      upstreamDone
    }) => {
      if (satisfied) {
        return CH.as_(CH.write(CK.flatten(leftovers)), O.some(doneValue));
      } else if (upstreamDone) {
        return CH.as_(CH.write(CK.flatten(leftovers)), O.none);
      } else {
        return loop;
      }
    })(CH.bind("upstreamDone", () => CH.fromEffect(upstreamDoneRef.get))(CH.bind("_", () => CH.fromEffect(leftoversRef.set(CK.flatten(leftovers))))(CH.bind("satisfied", () => CH.fromEffect(f(doneValue)))(CH.do)))), ({
      res
    }) => res));
    return upstreamMarker[">>>"](CH.bufferChunk(leftoversRef))[">>>"](loop);
  }));
}
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 *
 * @ets_data_first untilOutputEffect_
 */

export function untilOutputEffect(f) {
  return self => untilOutputEffect_(self, f);
}
//# sourceMappingURL=untilOutputEffect.mjs.map