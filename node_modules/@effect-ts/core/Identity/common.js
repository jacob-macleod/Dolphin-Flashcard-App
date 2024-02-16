"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.any = exports.all = void 0;
exports.fromAssociative = fromAssociative;
exports.void = exports.sum = exports.string = exports.product = void 0;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Associative/common.js"));

var _makeIdentity = /*#__PURE__*/require("./makeIdentity.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Derive `Identity` from `Associative` and `identity`
 */
function fromAssociative(A) {
  return identity => (0, _makeIdentity.makeIdentity)(identity, A.combine);
}
/**
 * Boolean `Identity` under conjunction
 */


const all = /*#__PURE__*/(0, _makeIdentity.makeIdentity)(true, A.all.combine);
/**
 * Boolean `Identity` under disjunction
 */

exports.all = all;
const any = /*#__PURE__*/fromAssociative(A.any)(false);
/**
 * Number `Identity` under multiplication
 */

exports.any = any;
const product = /*#__PURE__*/fromAssociative(A.product)(1);
/**
 * String `Identity` under concatenation
 */

exports.product = product;
const string = /*#__PURE__*/fromAssociative(A.string)("");
/**
 * Number `Identity` under addition
 */

exports.string = string;
const sum = /*#__PURE__*/fromAssociative(A.sum)(0);
/**
 * Void `Identity`
 */

exports.sum = sum;
const void_ = /*#__PURE__*/fromAssociative(A.void)(undefined);
exports.void = void_;
//# sourceMappingURL=common.js.map