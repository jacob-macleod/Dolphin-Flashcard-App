"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllWithExec = zipAllWithExec;
exports.zipAllWithExec_ = zipAllWithExec_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index6 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _utils = /*#__PURE__*/require("../_internal/utils.js");

var _combineChunks = /*#__PURE__*/require("./combineChunks.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

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
    const [emit, newExcess] = (0, _utils.zipChunks_)(chunkL, chunkR, both);

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

  return (0, _combineChunks.combineChunks_)(self, that, Tp.tuple(new Running(), E.left(A.empty)), ({
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


function zipAllWithExec(that, exec, left, right, both) {
  return self => zipAllWithExec_(self, that, exec, left, right, both);
}
//# sourceMappingURL=zipAllWithExec.js.map