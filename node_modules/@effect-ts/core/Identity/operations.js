"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveIdentity = deriveIdentity;
exports.endomorphism = endomorphism;
exports.fold = fold;
exports.func = func;
exports.inverted = inverted;
exports.max = max;
exports.min = min;
exports.struct = struct;
exports.tuple = tuple;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Associative/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _makeIdentity = /*#__PURE__*/require("./makeIdentity.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Derive `Identity`
 */
function deriveIdentity(D, I) {
  return D.derive(I);
}
/**
 * Fold `Identity` through an array
 */


function fold(M) {
  const foldM = A.fold(M);
  return foldM(M.identity);
}
/**
 * The dual of a `Identity`, obtained by swapping the arguments of `concat`.
 */


function inverted(M) {
  return (0, _makeIdentity.makeIdentity)(M.identity, A.inverted(M).combine);
}
/**
 * `Identity` for endomorphisms
 */


function endomorphism() {
  return (0, _makeIdentity.makeIdentity)(_index2.identity, (x, y) => a => a);
}
/**
 * `Identity` for function combination
 */


function func(M) {
  return () => (0, _makeIdentity.makeIdentity)(_ => M.identity, A.func(M)().combine);
}
/**
 * `Identity` that returns last `Max` of elements
 */


function max(B) {
  return (0, _makeIdentity.makeIdentity)(B.bottom, A.max(B).combine);
}
/**
 * `Identity` that returns last `Min` of elements
 */


function min(B) {
  return (0, _makeIdentity.makeIdentity)(B.top, A.min(B).combine);
}
/**
 * Given a struct of `Identity` returns a `Identity` for the struct
 */


function struct(identities) {
  const empty = {};

  for (const key of Object.keys(identities)) {
    empty[key] = identities[key].identity;
  }

  return (0, _makeIdentity.makeIdentity)(empty, A.struct(identities).combine);
}
/**
 * Given a tuple of `Identity` returns a `Identity` for the tuple
 */


function tuple(...identities) {
  return (0, _makeIdentity.makeIdentity)(identities.map(m => m.identity), A.tuple(...identities).combine);
}
//# sourceMappingURL=operations.js.map