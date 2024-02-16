// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as LoopOnChunks from "./loopOnChunks.mjs";
/**
 * Loops on chunks emitting partially
 */

export function loopOnPartialChunks_(self, f) {
  return LoopOnChunks.loopOnChunks_(self, chunk => CH.unwrap(T.suspend(() => {
    const outputChunk = CK.builder();

    const emit = a => T.succeedWith(() => {
      outputChunk.append(a);
    });

    return T.catchAll_(T.map_(f(chunk, emit), cont => CH.chain_(CH.write(outputChunk.build()), () => CH.end(cont))), failure => T.succeedWith(() => {
      const partialResult = outputChunk.build();

      if (CK.isEmpty(partialResult)) {
        return CH.fail(failure);
      } else {
        return CH.zipRight_(CH.write(partialResult), CH.fail(failure));
      }
    }));
  })));
}
/**
 * Loops on chunks emitting partially
 *
 * @ets_data_first loopOnPartialChunks_
 */

export function loopOnPartialChunks(f) {
  return self => loopOnPartialChunks_(self, f);
}
//# sourceMappingURL=loopOnPartialChunks.mjs.map