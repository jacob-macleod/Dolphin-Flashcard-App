// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */

export function reduce(z, cont, f) {
  const reduceChunkSplit = (z, chunk) => cont => f => {
    const reduce = (s, chunk, idx, len) => {
      if (idx === len) {
        return Tp.tuple(s, CK.empty());
      } else {
        const s1 = f(s, CK.unsafeGet_(chunk, idx));

        if (cont(s1)) {
          return reduce(s1, chunk, idx + 1, len);
        } else {
          return Tp.tuple(s1, CK.drop_(chunk, idx + 1));
        }
      }
    };

    return reduce(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => {
    if (!cont(s)) {
      return CH.end(s);
    } else {
      return CH.readWith(_in => {
        const {
          tuple: [nextS, leftovers]
        } = reduceChunkSplit(s, _in)(cont)(f);

        if (!CK.isEmpty(leftovers)) {
          return CH.as_(CH.write(leftovers), nextS);
        } else {
          return reader(nextS);
        }
      }, err => CH.fail(err), _ => CH.end(s));
    }
  };

  return new C.Sink(reader(z));
}
//# sourceMappingURL=reduce.mjs.map