// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { zipChunks_ } from "../_internal/utils.mjs";
import { combineChunks_ } from "./combineChunks.mjs";
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 */

export function zipAllWithExec_(self, that, exec, left, right, both) {
  class Running {
    constructor() {
      this._tag = "Running";
    }

  }

  class LeftDone {
    constructor() {
      this._tag = "LeftDone";
    }

  }

  class RightDone {
    constructor() {
      this._tag = "RightDone";
    }

  }

  class End {
    constructor() {
      this._tag = "End";
    }

  }

  const handleSuccess = (maybeO, maybeO2, excess) => {
    const [excessL, excessR] = E.fold_(excess, l => [l, A.empty()], r => [A.empty(), r]);
    const chunkL = O.fold_(maybeO, () => excessL, upd => A.concat_(excessL, upd));
    const chunkR = O.fold_(maybeO2, () => excessR, upd => A.concat_(excessR, upd));
    const [emit, newExcess] = zipChunks_(chunkL, chunkR, both);

    const [fullEmit, status] = ((oDefined, o2Defined) => {
      if (oDefined && o2Defined) {
        return [emit, new Running()];
      }

      if (!oDefined && !o2Defined) {
        const leftover = E.fold_(newExcess, A.map(left), A.map(right));
        return [A.concat_(emit, leftover), new End()];
      }

      if (!oDefined && o2Defined) {
        return [emit, new LeftDone()];
      }

      return [emit, new RightDone()];
    })(O.isSome(maybeO), O.isSome(maybeO2));

    return Ex.succeed(Tp.tuple(fullEmit, Tp.tuple(status, newExcess)));
  };

  return combineChunks_(self, that, Tp.tuple(new Running(), E.left(A.empty)), ({
    tuple: [state, excess]
  }, pullL, pullR) => {
    switch (state._tag) {
      case "Running":
        {
          if (exec._tag === "Sequential") {
            return T.catchAllCause_(T.zipWith_(T.optional(pullL), T.optional(pullR), (a, b) => handleSuccess(a, b, excess)), e => T.succeed(Ex.halt(C.map_(e, O.some))));
          } else {
            return T.catchAllCause_(T.zipWithPar(T.optional(pullR), (a, b) => handleSuccess(a, b, excess))(T.optional(pullL)), e => T.succeed(Ex.halt(C.map_(e, O.some))));
          }
        }

      case "LeftDone":
        {
          return T.catchAllCause_(T.map_(T.optional(pullR), _ => handleSuccess(O.none, _, excess)), e => T.succeed(Ex.halt(C.map_(e, O.some))));
        }

      case "RightDone":
        {
          return T.catchAllCause_(T.map_(T.optional(pullL), _ => handleSuccess(_, O.none, excess)), e => T.succeed(Ex.halt(C.map_(e, O.some))));
        }

      case "End":
        {
          return T.succeed(Ex.fail(O.none));
        }
    }
  });
}
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 */

export function zipAllWithExec(that, exec, left, right, both) {
  return self => zipAllWithExec_(self, that, exec, left, right, both);
}
//# sourceMappingURL=zipAllWithExec.mjs.map