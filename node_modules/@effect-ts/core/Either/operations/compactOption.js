"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compactOption = compactOption;
exports.getCompact = getCompact;
exports.getCompactF = getCompactF;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _index = /*#__PURE__*/require("../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

var _forEachF = /*#__PURE__*/require("./forEachF.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Compact `Either<E, Option<A>>` given `Identity<E>`
 */
function compactOption(M) {
  return ma => {
    return E.isLeft(ma) ? ma : ma.right._tag === "None" ? E.left(M.identity) : E.right(ma.right.value);
  };
}
/**
 * Get `Witherable`'s `compactF` given `Identity<E>`
 */


function getCompactF(M) {
  const com = compactOption(M);
  return P.implementCompactF()(_ => G => {
    const traverseF = (0, _forEachF.forEachF)(G);
    return f => x => G.map(com)(traverseF(f)(x));
  });
}
/**
 * Get `Compact` instance given `Identity<E>`
 */


function getCompact(M) {
  const _compact = compactOption(M);

  return {
    compact: _compact
  };
}
//# sourceMappingURL=compactOption.js.map