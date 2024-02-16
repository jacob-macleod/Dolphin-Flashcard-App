"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllLeft = zipAllLeft;
exports.zipAllLeft_ = zipAllLeft_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _zipAllWith = /*#__PURE__*/require("./zipAllWith.js");

// ets_tracing: off

/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */
function zipAllLeft_(self, that, default_) {
  return (0, _zipAllWith.zipAllWith_)(self, that, _index.identity, _ => default_, o => o);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllLeft_
 */


function zipAllLeft(that, default_) {
  return self => zipAllLeft_(self, that, default_);
}
//# sourceMappingURL=zipAllLeft.js.map