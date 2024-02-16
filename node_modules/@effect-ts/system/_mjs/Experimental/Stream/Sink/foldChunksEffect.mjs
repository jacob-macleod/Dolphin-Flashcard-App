import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that effectfully folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */

export function foldChunksEffect(z, contFn, f) {
  const reader = s => CH.readWith(in_ => CH.chain_(CH.fromEffect(f(s, in_)), nextS => {
    if (contFn(nextS)) {
      return reader(nextS);
    } else {
      return CH.end(nextS);
    }
  }), err => CH.fail(err), _ => CH.end(s));

  return new C.Sink(contFn(z) ? reader(z) : CH.end(z));
}
//# sourceMappingURL=foldChunksEffect.mjs.map