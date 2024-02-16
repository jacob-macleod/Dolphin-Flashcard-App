"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllWithExec = zipAllWithExec;
exports.zipAllWithExec_ = zipAllWithExec_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var _index7 = /*#__PURE__*/require("../../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var ZipChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/zipChunks.js"));

var CombineChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./combineChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
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


function zipAllWithExec_(self, that, exec, left, right, both) {
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


function zipAllWithExec(that, exec, left, right, both) {
  return self => zipAllWithExec_(self, that, exec, left, right, both);
}
//# sourceMappingURL=zipAllWithExec.js.map