// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */

export function fold(z, contFn, f) {
  const foldChunkSplit = (z, chunk, contFn, f) => {
    const fold = (s, chunk, idx, len) => {
      if (idx === len) {
        return Tp.tuple(s, CK.empty());
      } else {
        const s1 = f(s, CK.unsafeGet_(chunk, idx));

        if (contFn(s1)) {
          return fold(s1, chunk, idx + 1, len);
        } else {
          return Tp.tuple(s1, CK.drop_(chunk, idx + 1));
        }
      }
    };

    return fold(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => {
    if (!contFn(s)) {
      return CH.end(s);
    }

    return CH.readWith(in_ => {
      const {
        tuple: [nextS, leftovers]
      } = foldChunkSplit(s, in_, contFn, f);

      if (!CK.isEmpty(leftovers)) {
        return CH.as_(CH.write(leftovers), nextS);
      } else {
        return reader(nextS);
      }
    }, err => CH.fail(err), _ => CH.end(s));
  };

  return new C.Sink(reader(z));
}
//# sourceMappingURL=fold.mjs.map