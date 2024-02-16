"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipParRight = zipParRight;
exports.zipParRight_ = zipParRight_;

var ZipWithPar = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWithPar.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 */
function zipParRight_(self, that) {
  return ZipWithPar.zipWithPar_(self, that, (_, c) => c);
}
/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 *
 * @ets_data_first zipParRight_
 */


function zipParRight(that) {
  return self => zipParRight_(self, that);
}
//# sourceMappingURL=zipParRight.js.map