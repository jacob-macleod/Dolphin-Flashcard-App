"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consecutive = consecutive;
exports.getAssociative = getAssociative;
exports.getIdentity = getIdentity;

var _Ord = /*#__PURE__*/require("@effect-ts/system/Ord");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Associative/index.js"));

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Identity/index.js"));

var _index3 = /*#__PURE__*/require("../Ordering/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a `Associative` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 */
function getAssociative() {
  return A.makeAssociative((x, y) => (0, _Ord.makeOrd)((a, b) => _index3.Associative.combine(x.compare(a, b), y.compare(a, b))));
}
/**
 * Returns a `Identity` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 */


function getIdentity() {
  return I.makeIdentity((0, _Ord.makeOrd)(() => 0), getAssociative().combine);
}
/**
 * Order by first, second, third, etc
 */


function consecutive(...ords) {
  return I.fold(getIdentity())(ords);
}
//# sourceMappingURL=operations.js.map