"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipLeft = zipLeft;
exports.zipLeft_ = zipLeft_;

var ZipWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */
function zipLeft_(self, that) {
  return ZipWith.zipWith_(self, that, (z, _) => z);
}
/**
 * Like `zip`, but keeps only the result from `that sink.
 *
 * @ets_data_first zipLeft_
 */


function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.js.map