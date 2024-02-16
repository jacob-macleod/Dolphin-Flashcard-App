"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllRight = zipAllRight;
exports.zipAllRight_ = zipAllRight_;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var ZipAllWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipAllWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */
function zipAllRight_(self, that, default_) {
  return ZipAllWith.zipAllWith_(self, that, _ => default_, _index.identity, (_, o) => o);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllRight_
 */


function zipAllRight(that, default_) {
  return self => zipAllRight_(self, that, default_);
}
//# sourceMappingURL=zipAllRight.js.map