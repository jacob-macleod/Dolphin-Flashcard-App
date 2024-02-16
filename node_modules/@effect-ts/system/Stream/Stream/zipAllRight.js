"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllRight = zipAllRight;
exports.zipAllRight_ = zipAllRight_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _zipAllWith = /*#__PURE__*/require("./zipAllWith.js");

// ets_tracing: off

/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */
function zipAllRight_(self, that, default_) {
  return (0, _zipAllWith.zipAllWith_)(self, that, _ => default_, _index.identity, (_, o2) => o2);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllRight_
 */


function zipAllRight(that, default_) {
  return self => zipAllRight_(self, that, default_);
}
//# sourceMappingURL=zipAllRight.js.map