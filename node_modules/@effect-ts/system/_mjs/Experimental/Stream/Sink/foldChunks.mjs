import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */

export function foldChunks(z, contFn, f) {
  const reader = s => CH.readWith(in_ => {
    const nextS = f(s, in_);
    return contFn(nextS) ? reader(nextS) : CH.end(nextS);
  }, err => CH.fail(err), _ => CH.end(s));

  return new C.Sink(contFn(z) ? reader(z) : CH.end(z));
}
//# sourceMappingURL=foldChunks.mjs.map