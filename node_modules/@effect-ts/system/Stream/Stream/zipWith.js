"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/api.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _utils = /*#__PURE__*/require("../_internal/utils.js");

var _combineChunks = /*#__PURE__*/require("./combineChunks.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */
function zipWith_(self, that, f) {
  const handleSuccess = (leftUpd, rightUpd, excess) => {
    const [leftExcess, rightExcess] = E.fold_(excess, l => (0, _index5.tuple)(l, A.empty()), r => (0, _index5.tuple)(A.empty(), r));
    const [left, right] = [O.fold_(leftUpd, () => leftExcess, upd => A.concat_(leftExcess, upd)), O.fold_(rightUpd, () => rightExcess, upd => A.concat_(rightExcess, upd))];
    const [emit, newExcess] = (0, _utils.zipChunks_)(left, right, f);

    if (O.isSome(leftUpd) && O.isSome(rightUpd)) {
      return Ex.succeed(Tp.tuple(emit, {
        _tag: "Running",
        excess: newExcess
      }));
    } else if (O.isNone(leftUpd) && O.isNone(rightUpd)) {
      return Ex.fail(O.none);
    } else {
      return Ex.succeed(Tp.tuple(emit, E.fold_(newExcess, l => !A.isEmpty(l) ? {
        _tag: "LeftDone",
        excessL: l
      } : {
        _tag: "End"
      }, r => !A.isEmpty(r) ? {
        _tag: "RightDone",
        excessR: r
      } : {
        _tag: "End"
      })));
    }
  };

  return (0, _combineChunks.combineChunks_)(self, that, {
    _tag: "Running",
    excess: E.left(A.empty())
  }, (st, p1, p2) => {
    switch (st._tag) {
      case "End":
        {
          return T.succeed(Ex.fail(O.none));
        }

      case "Running":
        {
          return T.catchAllCause_(T.zipWithPar(T.optional(p2), (l, r) => handleSuccess(l, r, st.excess))(T.optional(p1)), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }

      case "LeftDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p2), r => handleSuccess(O.none, r, E.left(st.excessL))), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }

      case "RightDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p1), l => handleSuccess(l, O.none, E.right(st.excessR))), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }
    }
  });
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */


function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.js.map