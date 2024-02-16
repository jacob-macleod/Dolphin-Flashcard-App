// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as E from "../../Either/index.mjs";
export function zipChunks_(fa, fb, f) {
  let fc = A.empty();
  const len = Math.min(A.size(fa), A.size(fb));

  for (let i = 0; i < len; i++) {
    fc = A.append_(fc, f(A.unsafeGet_(fa, i), A.unsafeGet_(fb, i)));
  }

  if (A.size(fa) > A.size(fb)) {
    return [fc, E.left(A.drop_(fa, A.size(fb)))];
  }

  return [fc, E.right(A.drop_(fb, A.size(fa)))];
}
//# sourceMappingURL=utils.mjs.map