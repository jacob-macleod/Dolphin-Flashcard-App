// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as LoopOnPartialChunks from "./loopOnPartialChunks.mjs";
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhileEffect_(self, pf) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (chunk, emit) => {
    const pfSome = a => O.fold_(pf(a), () => T.succeed(false), _ => T.as_(T.chain_(_, emit), true));

    const loop = chunk => {
      if (CK.isEmpty(chunk)) {
        return T.succeed(true);
      } else {
        return T.chain_(pfSome(CK.unsafeHead(chunk)), cont => {
          if (cont) {
            return loop(CK.unsafeTail(chunk));
          } else {
            return T.succeed(false);
          }
        });
      }
    };

    return loop(chunk);
  });
}
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhileEffect_
 */

export function collectWhileEffect(pf) {
  return self => collectWhileEffect_(self, pf);
}
//# sourceMappingURL=collectWhileEffect.mjs.map