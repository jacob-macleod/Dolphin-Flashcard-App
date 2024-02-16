"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromIterableM = fromIterableM;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _mapConcat = /*#__PURE__*/require("./mapConcat.js");

// ets_tracing: off

/**
 * Creates a stream from an iterable collection of values
 */
function fromIterableM(iterable) {
  return (0, _mapConcat.mapConcat_)((0, _fromEffect.fromEffect)(iterable), _index.identity);
}
//# sourceMappingURL=fromIterableM.js.map