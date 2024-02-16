"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessStream = accessStream;

var _chain = /*#__PURE__*/require("./chain.js");

var _environment = /*#__PURE__*/require("./environment.js");

// ets_tracing: off

/**
 * Accesses the environment of the stream in the context of a stream.
 */
function accessStream(f) {
  return (0, _chain.chain_)((0, _environment.environment)(), f);
}
//# sourceMappingURL=accessStream.js.map