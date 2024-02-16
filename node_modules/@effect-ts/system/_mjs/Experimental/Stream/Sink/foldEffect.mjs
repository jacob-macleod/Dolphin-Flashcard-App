// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 */

export function foldEffect(z, contFn, f) {
  const foldChunkSplitM = (z, chunk, contFn, f) => {
    const fold = (s, chunk, idx, len) => {
      if (idx === len) {
        return T.succeed(Tp.tuple(s, O.none));
      } else {
        return T.chain_(f(s, CK.unsafeGet_(chunk, idx)), s1 => {
          if (contFn(s1)) {
            return fold(s1, chunk, idx + 1, len);
          } else {
            return T.succeed(Tp.tuple(s1, O.some(CK.drop_(chunk, idx + 1))));
          }
        });
      }
    };

    return fold(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => CH.readWith(in_ => CH.chain_(CH.fromEffect(foldChunkSplitM(s, in_, contFn, f)), ({
    tuple: [nextS, leftovers]
  }) => O.fold_(leftovers, () => reader(nextS), l => CH.as_(CH.write(l), nextS))), err => CH.fail(err), _ => CH.end(s));

  return new C.Sink(contFn(z) ? reader(z) : CH.end(z));
}
//# sourceMappingURL=foldEffect.mjs.map