// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as ZipChunks from "./_internal/zipChunks.mjs";
import * as CombineChunks from "./combineChunks.mjs";
const StatusTypeId = /*#__PURE__*/Symbol();
const RunningTypeId = /*#__PURE__*/Symbol();

class Running {
  constructor() {
    this._statusTypeId = StatusTypeId;
    this._typeId = RunningTypeId;
  }

}

const LeftDoneTypeId = /*#__PURE__*/Symbol();

class LeftDone {
  constructor() {
    this._statusTypeId = StatusTypeId;
    this._typeId = LeftDoneTypeId;
  }

}

const RightDoneTypeId = /*#__PURE__*/Symbol();

class RightDone {
  constructor() {
    this._statusTypeId = StatusTypeId;
    this._typeId = RightDoneTypeId;
  }

}

const EndTypeId = /*#__PURE__*/Symbol();

class End {
  constructor() {
    this._statusTypeId = StatusTypeId;
    this._typeId = EndTypeId;
  }

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


export function zipAllWithExec_(self, that, exec, left, right, both) {
  const handleSuccess = (maybeO, maybeA1, excess) => {
    const {
      tuple: [excessL, excessR]
    } = E.fold_(excess, l => Tp.tuple(l, CK.empty()), r => Tp.tuple(CK.empty(), r));
    const chunkL = O.fold_(maybeO, () => excessL, upd => CK.concat_(excessL, upd));
    const chunkR = O.fold_(maybeA1, () => excessR, upd => CK.concat_(excessR, upd));
    const {
      tuple: [emit, newExcess]
    } = ZipChunks.zipChunks_(chunkL, chunkR, both);

    const {
      tuple: [fullEmit, status]
    } = (() => {
      if (O.isSome(maybeO)) {
        if (O.isSome(maybeA1)) {
          return Tp.tuple(emit, new Running());
        } else {
          return Tp.tuple(emit, new RightDone());
        }
      } else {
        if (O.isSome(maybeA1)) {
          return Tp.tuple(emit, new LeftDone());
        } else {
          const leftover = E.fold_(newExcess, CK.map(left), CK.map(right));
          return Tp.tuple(CK.concat_(emit, leftover), new End());
        }
      }
    })();

    return Ex.succeed(Tp.tuple(fullEmit, Tp.tuple(status, newExcess)));
  };

  return CombineChunks.combineChunks_(self, that, Tp.tuple(new Running(), E.left(CK.empty())), ({
    tuple: [status, excess]
  }, pullL, pullR) => {
    switch (status._typeId) {
      case RunningTypeId:
        {
          if (exec._tag === "Sequential") {
            return T.catchAllCause_(T.zipWith_(T.unoption(pullL), T.unoption(pullR), (a, b) => handleSuccess(a, b, excess)), e => T.succeed(Ex.failCause(CS.map_(e, O.some))));
          } else {
            return T.catchAllCause_(T.zipWithPar(T.unoption(pullR), (a, b) => handleSuccess(a, b, excess))(T.unoption(pullL)), e => T.succeed(Ex.failCause(CS.map_(e, O.some))));
          }
        }

      case LeftDoneTypeId:
        return T.catchAllCause_(T.map_(T.unoption(pullR), _ => handleSuccess(O.none, _, excess)), e => T.succeed(Ex.failCause(CS.map_(e, O.some))));

      case RightDoneTypeId:
        return T.catchAllCause_(T.map_(T.unoption(pullL), _ => handleSuccess(_, O.none, excess)), e => T.succeed(Ex.failCause(CS.map_(e, O.some))));

      case EndTypeId:
        return T.succeed(Ex.fail(O.none));
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
 *
 * @ets_data_first zipAllWithExec_
 */

export function zipAllWithExec(that, exec, left, right, both) {
  return self => zipAllWithExec_(self, that, exec, left, right, both);
}
//# sourceMappingURL=zipAllWithExec.mjs.map