// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as Ref from "../../../Ref/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 */

export function collectAllWhileWith_(self, z, p, f) {
  return new C.Sink(CH.chain_(CH.fromEffect(T.zip_(Ref.makeRef(CK.empty()), Ref.makeRef(false))), ({
    tuple: [leftoversRef, upstreamDoneRef]
  }) => {
    const upstreamMarker = CH.readWith(in_ => CH.zipRight_(CH.write(in_), upstreamMarker), _ => CH.fail(_), x => CH.as_(CH.fromEffect(upstreamDoneRef.set(true)), x));

    const loop = currentResult => CH.foldChannel_(CH.doneCollect(self.channel), _ => CH.fail(_), ({
      tuple: [leftovers, doneValue]
    }) => {
      if (p(doneValue)) {
        return CH.map_(CH.bind("result", ({
          accumulatedResult,
          upstreamDone
        }) => upstreamDone ? CH.as_(CH.write(CK.flatten(leftovers)), currentResult) : loop(accumulatedResult))(CH.let("accumulatedResult", () => f(currentResult, doneValue))(CH.bind("upstreamDone", () => CH.fromEffect(upstreamDoneRef.get))(CH.fromEffect(leftoversRef.set(CK.flatten(leftovers)))))), ({
          result
        }) => result);
      } else {
        return CH.as_(CH.write(CK.flatten(leftovers)), currentResult);
      }
    });

    return upstreamMarker[">>>"](CH.bufferChunk(leftoversRef))[">>>"](loop(z));
  }));
}
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 *
 * @ets_data_first collectAllWhileWith_
 */

export function collectAllWhileWith(z, p, f) {
  return self => collectAllWhileWith_(self, z, p, f);
}
//# sourceMappingURL=collectAllWhileWith.mjs.map