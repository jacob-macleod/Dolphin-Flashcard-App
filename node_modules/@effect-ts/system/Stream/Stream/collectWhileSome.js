"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhileSome = collectWhileSome;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _collectWhileMap = /*#__PURE__*/require("./collectWhileMap.js");

// ets_tracing: off

/**
 * Terminates the stream when encountering the first `None`.
 */
function collectWhileSome(self) {
  return (0, _collectWhileMap.collectWhileMap_)(self, _index.identity);
}
//# sourceMappingURL=collectWhileSome.js.map