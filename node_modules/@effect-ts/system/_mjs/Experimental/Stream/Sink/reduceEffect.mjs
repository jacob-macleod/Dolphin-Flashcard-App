// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 */

export function reduceEffect(z, cont, f) {
  const reduceChunkSplit = (z, chunk) => cont => f => {
    const reduce = (s, chunk, idx, len) => {
      if (idx === len) {
        return T.succeed(Tp.tuple(s, O.none));
      } else {
        return T.chain_(f(s, CK.unsafeGet_(chunk, idx)), s1 => {
          if (cont(s1)) {
            return reduce(s1, chunk, idx + 1, len);
          } else {
            return T.succeed(Tp.tuple(s1, O.some(CK.drop_(chunk, idx + 1))));
          }
        });
      }
    };

    return reduce(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => {
    if (!cont(s)) {
      return CH.end(s);
    } else {
      return CH.readWith(_in => {
        return CH.chain_(CH.fromEffect(reduceChunkSplit(s, _in)(cont)(f)), ({
          tuple: [nextS, leftovers]
        }) => {
          return O.fold_(leftovers, () => reader(nextS), l => CH.as_(CH.write(l), nextS));
        });
      }, err => CH.fail(err), _ => CH.end(s));
    }
  };

  return new C.Sink(reader(z));
}
//# sourceMappingURL=reduceEffect.mjs.map