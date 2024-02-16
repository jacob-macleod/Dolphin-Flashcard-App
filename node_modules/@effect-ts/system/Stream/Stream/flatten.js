"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = void 0;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _chain = /*#__PURE__*/require("./chain.js");

// ets_tracing: off

/**
 * Flattens this stream-of-streams into a stream made of the concatenation in
 * strict order of all the streams.
 */
const flatten = /*#__PURE__*/(0, _chain.chain)(_index.identity);
exports.flatten = flatten;
//# sourceMappingURL=flatten.js.map