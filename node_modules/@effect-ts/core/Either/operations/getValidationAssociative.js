"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidationAssociative = getValidationAssociative;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _index = /*#__PURE__*/require("../../Associative/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Get an `Associative` instance for `Either` that combines both success and failure
 * given `Associative` of `A` & `E`.
 */
function getValidationAssociative(SE, SA) {
  return (0, _index.makeAssociative)((fx, fy) => E.isLeft(fx) ? E.isLeft(fy) ? E.left(SE.combine(fx.left, fy.left)) : fx : E.isLeft(fy) ? fy : E.right(SA.combine(fx.right, fy.right)));
}
//# sourceMappingURL=getValidationAssociative.js.map