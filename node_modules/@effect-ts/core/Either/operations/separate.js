"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeparate = getSeparate;
exports.getSeparateF = getSeparateF;
exports.separate = separate;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

var _forEachF = /*#__PURE__*/require("./forEachF.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Separate `Either<E, Either<A, B>>` given `Identity<E>`
 */
function separate(M) {
  const empty = E.left(M.identity);
  return ma => {
    return E.isLeft(ma) ? Tp.tuple(ma, ma) : E.isLeft(ma.right) ? Tp.tuple(E.right(ma.right.left), empty) : Tp.tuple(empty, E.right(ma.right.right));
  };
}
/**
 * Get `Wiltable`'s `separateF` given `Identity<E>`
 */


function getSeparateF(M) {
  const sep = separate(M);
  return P.implementSeparateF()(_ => G => {
    const traverseF = (0, _forEachF.forEachF)(G);
    return f => x => G.map(sep)(traverseF(f)(x));
  });
}
/**
 * Get `Separate` instance given `Identity<E>`
 */


function getSeparate(M) {
  const _separate = separate(M);

  return {
    separate: _separate
  };
}
//# sourceMappingURL=separate.js.map