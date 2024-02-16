"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropUntil = dropUntil;
exports.dropUntil_ = dropUntil_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _drop = /*#__PURE__*/require("./drop.js");

var _dropWhile = /*#__PURE__*/require("./dropWhile.js");

/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
function dropUntil_(self, pred) {
  return (0, _drop.drop_)((0, _dropWhile.dropWhile_)(self, (0, _index.not)(pred)), 1);
}
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */


function dropUntil(pred) {
  return self => dropUntil_(self, pred);
}
//# sourceMappingURL=dropUntil.js.map