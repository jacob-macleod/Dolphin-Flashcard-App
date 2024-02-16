// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements. Be vigilant with
 * this function, it has to generate "simpler" values or the fold may never end.
 * A value is considered indivisible if `decompose` yields the empty chunk or a
 * single-valued chunk. In these cases, there is no other choice than to yield
 * a value that will cross the threshold.
 *
 * See `foldWeightedDecompose` for an example.
 */

export function foldWeightedDecomposeEffect(z, costFn, max, decompose, f) {
  const go = (s, cost, dirty) => CH.readWith(in_ => {
    const fold = (in_, s, dirty, cost, idx) => {
      if (idx === CK.size(in_)) {
        return T.succeed(Tp.tuple(s, cost, dirty, CK.empty()));
      } else {
        const elem = CK.unsafeGet_(in_, idx);
        return T.chain_(T.map_(costFn(s, elem), _ => cost + _), total => {
          if (total <= max) {
            return T.chain_(f(s, elem), _ => fold(in_, _, true, total, idx + 1));
          } else {
            return T.chain_(decompose(elem), decomposed => {
              if (CK.size(decomposed) <= 1 && !dirty) {
                return T.map_(f(s, elem), _ => Tp.tuple(_, total, true, CK.drop_(in_, idx + 1)));
              } else if (CK.size(decomposed) <= 1 && dirty) {
                return T.succeed(Tp.tuple(s, cost, dirty, CK.drop_(in_, idx)));
              } else {
                return fold(CK.concat_(decomposed, CK.drop_(in_, idx + 1)), s, dirty, cost, 0);
              }
            });
          }
        });
      }
    };

    return CH.chain_(CH.fromEffect(fold(in_, s, dirty, cost, 0)), ({
      tuple: [nextS, nextCost, nextDirty, leftovers]
    }) => {
      if (!CK.isEmpty(leftovers)) {
        return CH.zipRight_(CH.write(leftovers), CH.end(nextS));
      } else if (cost > max) {
        return CH.end(nextS);
      } else {
        return go(nextS, nextCost, nextDirty);
      }
    });
  }, err => CH.fail(err), _ => CH.end(s));

  return new C.Sink(go(z, 0, false));
}
//# sourceMappingURL=foldWeightedDecomposeEffect.mjs.map