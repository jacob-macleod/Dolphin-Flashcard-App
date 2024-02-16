"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var ZipChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/zipChunks.js"));

var CombineChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./combineChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Running {
  constructor(excess) {
    this.excess = excess;
    this._tag = "Running";
  }

}

class LeftDone {
  constructor(excessL) {
    this.excessL = excessL;
    this._tag = "LeftDone";
  }

}

class RightDone {
  constructor(excessR) {
    this.excessR = excessR;
    this._tag = "RightDone";
  }

}

class End {
  constructor() {
    this._tag = "End";
  }

}

function handleSuccess(f, leftUpd, rightUpd, excess) {
  const [leftExcess, rightExcess] = E.fold_(excess, l => [l, CK.empty()], r => [CK.empty(), r]);
  const left = O.fold_(leftUpd, () => leftExcess, upd => CK.concat_(leftExcess, upd));
  const right = O.fold_(rightUpd, () => rightExcess, upd => CK.concat_(rightExcess, upd));
  const {
    tuple: [emit, newExcess]
  } = ZipChunks.zipChunks_(left, right, f);

  if (leftUpd._tag === "Some" && rightUpd._tag === "Some") {
    return Ex.succeed(Tp.tuple(emit, new Running(newExcess)));
  }

  if (leftUpd._tag === "None" && rightUpd._tag === "None") {
    return Ex.fail(O.none);
  }

  const newState = newExcess._tag === "Left" ? CK.isEmpty(newExcess.left) ? new End() : new LeftDone(newExcess.left) : CK.isEmpty(newExcess.right) ? new End() : new RightDone(newExcess.right);
  return Ex.succeed(Tp.tuple(emit, newState));
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 */


function zipWith_(self, that, f) {
  return CombineChunks.combineChunks_(self, that, new Running(E.left(CK.empty())), (st, p1, p2) => {
    switch (st._tag) {
      case "End":
        {
          return T.succeed(Ex.fail(O.none));
        }

      case "Running":
        {
          return T.catchAllCause_(T.zipWithPar_(T.optional(p1), T.optional(p2), (l, r) => handleSuccess(f, l, r, st.excess)), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }

      case "LeftDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p2), l => handleSuccess(f, O.none, l, E.left(st.excessL))), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }

      case "RightDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p1), r => handleSuccess(f, r, O.none, E.right(st.excessR))), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }
    }
  });
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.js.map